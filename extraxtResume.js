const fs = require('fs');
const pdf = require('pdf-parse');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: '',
});

class Person {
    constructor(first_name, middle_name, last_name, email, phone_number, key_skills, years_of_experience, experience_summary, employment_history, education, achievements, certifications) {
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.last_name = last_name;
        this.email = email;
        this.phone_number = phone_number;
        this.key_skills = key_skills;
        this.years_of_experience = years_of_experience;
        this.experience_summary = experience_summary;
        this.employment_history = employment_history;
        this.education = education;
        this.achievements = achievements;
        this.certifications = certifications;
    }
}

class Employment {
    constructor(organization, role, start_date, end_date) {
        this.organization = organization;
        this.role = role;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}

class Education {
    constructor(institution, degree, field_of_study, start_date, end_date) {
        this.institution = institution;
        this.degree = degree;
        this.field_of_study = field_of_study;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}

class Data {
    constructor(persons) {
        this.persons = persons;
    }
}

async function parseResume(resumeText) {
    try {
        const MAX_TOKENS = 8192;
        const CHUNK_SIZE = 4000;

        const truncateText = (text, length) => text.length > length ? text.substring(0, length) : text;
        const splitText = (text, size) => {
            const result = [];
            for (let i = 0; i < text.length; i += size) {
                result.push(text.substring(i, i + size));
            }
            return result;
        };

        const truncatedResumeText = truncateText(resumeText, MAX_TOKENS - 500);
        const chunks = splitText(truncatedResumeText, CHUNK_SIZE);

        const results = [];
        for (const chunk of chunks) {
            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-4",
                    messages: [
                        {
                            role: "system",
                            content: "You are an AI assistant specialized in parsing resumes. Extract the requested information and format it as a JSON object."
                        },
                        {
                            role: "user",
                            content: `Parse the following resume chunk and extract these details in JSON format:
                            {
                                "name": "Full Name",
                                "email": "Email Address",
                                "phone_number": "Phone Number",
                                "key_skills": ["Skill 1", "Skill 2", ...],
                                "years_of_experience": Number,
                                "experience_summary": "Brief summary",
                                "employment_history": [
                                    {
                                        "organization": "Company Name",
                                        "role": "Job Title",
                                        "start_date": "YYYY-MM",
                                        "end_date": "YYYY-MM or 'Present'"
                                    },
                                    ...
                                ],
                                "education": [
                                    {
                                        "institution": "Institution Name",
                                        "degree": "Degree",
                                        "field_of_study": "Field of Study",
                                        "start_date": "YYYY-MM",
                                        "end_date": "YYYY-MM or 'Present'"
                                    },
                                    ...
                                ],
                                "achievements": ["Achievement 1", "Achievement 2", ...],
                                "certifications": ["Certification 1", "Certification 2", ...]
                            }

                            Resume chunk:
                            ${chunk}`
                        }
                    ],
                    max_tokens: 2000,
                    temperature: 0.2
                });

                const text = response?.choices[0].message.content.trim();

                if (text.startsWith('{') && text.endsWith('}')) {
                    const parsedData = JSON.parse(text);
                    results.push(parsedData);
                } else {
                    results.push({ error: 'Received non-JSON response.' });
                }
            } catch (apiError) {
                results.push({ error: 'OpenAI API request failed.' });
            }
        }

        const combinedResult = results.reduce((acc, curr) => {
            if (curr.error) return acc;
            if (!acc.name && curr.name) acc.name = curr.name;
            if (!acc.email && curr.email) acc.email = curr.email;
            if (!acc.phone_number && curr.phone_number) acc.phone_number = curr.phone_number;
            if (!acc.key_skills) acc.key_skills = [];
            if (curr.key_skills) acc.key_skills = [...new Set([...acc.key_skills, ...curr.key_skills])];
            if (!acc.years_of_experience && curr.years_of_experience) acc.years_of_experience = curr.years_of_experience;
            if (!acc.experience_summary && curr.experience_summary) acc.experience_summary = curr.experience_summary;
            if (!acc.employment_history) acc.employment_history = [];
            if (curr.employment_history) acc.employment_history = [...acc.employment_history, ...curr.employment_history];
            if (!acc.education) acc.education = [];
            if (curr.education) acc.education = [...acc.education, ...curr.education];
            if (!acc.achievements) acc.achievements = [];
            if (curr.achievements) acc.achievements = [...acc.achievements, ...curr.achievements];
            if (!acc.certifications) acc.certifications = [];
            if (curr.certifications) acc.certifications = [...acc.certifications, ...curr.certifications];
            return acc;
        }, {});

        const [firstName, ...rest] = combinedResult.name.split(' ');
        const lastName = rest.pop();
        const middleName = rest.join(' ');

        const processedResult = {
            ...combinedResult,
            first_name: firstName,
            middle_name: middleName || '',
            last_name: lastName
        };

        return new Data([new Person(
            processedResult.first_name,
            processedResult.middle_name,
            processedResult.last_name,
            processedResult.email,
            processedResult.phone_number,
            processedResult.key_skills,
            processedResult.years_of_experience,
            processedResult.experience_summary,
            processedResult.employment_history ? processedResult.employment_history.map(emp => new Employment(emp.organization, emp.role, emp.start_date, emp.end_date)) : [],
            processedResult.education ? processedResult.education.map(edu => new Education(edu.institution, edu.degree, edu.field_of_study, edu.start_date, edu.end_date)) : [],
            processedResult.achievements || [],
            processedResult.certifications || []
        )]);
    } catch (error) {
        throw error;
    }
}

async function extractResumeData(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        const resumeText = data.text;
        if (!resumeText) {
            throw new Error("Resume text is empty after parsing.");
        }
        const result = await parseResume(resumeText);
        console.log(JSON.stringify({ extractedData: result }, null, 2));
    } catch (error) {
        console.error("Error extracting resume data:", error);
    }
}

// Replace with the path to your resume PDF file
const resumePath = 'C:/Users/User/Downloads/Abilesh.pdf';
extractResumeData(resumePath);

// const fs = require('fs');
// const pdf = require('pdf-parse');

// async function extractTextFromPdf(filePath) {
//     const dataBuffer = fs.readFileSync(filePath);
//     const data = await pdf(dataBuffer);
//     return data.text;
// }

// function extractInfo(text) {
//     // Define patterns
//     const namePattern = /Name:\s*(\w+)\s*(\w*)\s*(\w*)/;
//     const emailPattern = /Email:\s*([\w.-]+@[\w.-]+)/;
//     const phonePattern = /Phone:\s*(\+?\d[\d -]{8,12}\d)/;
//     const skillsPattern = /Skills:\s*(.*)/;
//     const experiencePattern = /Experience:\s*(\d+)\s*years/;
//     const summaryPattern = /Summary:\s*(.*)/;
//     const employmentPattern = /Employment History:(.*?)(?=Education|Achievements|Certifications)/s;
//     const educationPattern = /Education:(.*?)(?=Achievements|Certifications)/s;
//     const achievementPattern = /Achievements:\s*(.*)/;
//     const certificationPattern = /Certifications:\s*(.*)/;

//     // Extract information
//     const nameMatch = text.match(namePattern);
//     const emailMatch = text.match(emailPattern);
//     const phoneMatch = text.match(phonePattern);
//     const skillsMatch = text.match(skillsPattern);
//     const experienceMatch = text.match(experiencePattern);
//     const summaryMatch = text.match(summaryPattern);
//     const employmentMatch = text.match(employmentPattern);
//     const educationMatch = text.match(educationPattern);
//     const achievementMatch = text.match(achievementPattern);
//     const certificationMatch = text.match(certificationPattern);

//     const firstName = nameMatch ? nameMatch[1] : null;
//     const middleName = nameMatch ? nameMatch[2] : null;
//     const lastName = nameMatch ? nameMatch[3] : null;
//     const email = emailMatch ? emailMatch[1] : null;
//     const phoneNumber = phoneMatch ? phoneMatch[1] : null;
//     const keySkills = skillsMatch ? skillsMatch[1].split(",") : [];
//     const yearsOfExperience = experienceMatch ? parseInt(experienceMatch[1]) : null;
//     const experienceSummary = summaryMatch ? summaryMatch[1] : null;
//     const achievements = achievementMatch ? achievementMatch[1].split(",") : [];
//     const certifications = certificationMatch ? certificationMatch[1].split(",") : [];

//     // Process employment history
//     const employmentHistory = [];
//     if (employmentMatch) {
//         const employmentText = employmentMatch[1];
//         const employmentEntries = [...employmentText.matchAll(/Organization:\s*(.*?),\s*Role:\s*(.*?),\s*Start Date:\s*(.*?),\s*End Date:\s*(.*?)(?=\n|$)/g)];
//         for (const entry of employmentEntries) {
//             employmentHistory.push({
//                 organization: entry[1],
//                 role: entry[2],
//                 startDate: entry[3],
//                 endDate: entry[4],
//             });
//         }
//     }

//     // Process education history
//     const education = [];
//     if (educationMatch) {
//         const educationText = educationMatch[1];
//         const educationEntries = [...educationText.matchAll(/Institution:\s*(.*?),\s*Degree:\s*(.*?),\s*Field of Study:\s*(.*?),\s*Start Date:\s*(.*?),\s*End Date:\s*(.*?)(?=\n|$)/g)];
//         for (const entry of educationEntries) {
//             education.push({
//                 institution: entry[1],
//                 degree: entry[2],
//                 fieldOfStudy: entry[3],
//                 startDate: entry[4],
//                 endDate: entry[5],
//             });
//         }
//     }

//     return {
//         firstName,
//         middleName,
//         lastName,
//         email,
//         phoneNumber,
//         keySkills,
//         yearsOfExperience,
//         experienceSummary,
//         employmentHistory,
//         education,
//         achievements,
//         certifications,
//     };
// }

// async function main(filePath) {
//     const text = await extractTextFromPdf(filePath);
//     const info = extractInfo(text);
//     console.log(info);
// }

// const resumePath = 'C:/Users/User/Downloads/V.kavin kumar (1).pdf';
// main(resumePath).catch(console.error);

