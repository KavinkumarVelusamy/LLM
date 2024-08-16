// const Resume='C:/Users/User/Downloads/Robin.pdf';
// const excelPath='C:/Users/User/Desktop/RobinResume data.xlsx'

// const XLSX = require('xlsx');
// // Function to read the Excel file
// function readExcelFile(filePath) {
//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     return XLSX.utils.sheet_to_json(sheet);
// }
// module.exports = { readExcelFile };

// const { OpenAI } = require('openai');
// // Initialize OpenAI with your API key
// const openai = new OpenAI({
//     apiKey: ''  // Ensure you have set your API key
// });
// async function compareData(data1, data2) {
//     const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//             {
//                 role: "system",
//                 content: "You are an AI assistant specialized in comparing datasets. Determine whether the datasets match and provide a percentage of similarity. You will compare the data for meaning and semantic similarity and not for an exact match."
//             },
//             {
//                 role: "user",
//                 content: `Compare the following two datasets and determine if they match and the percentage of similarity and give detailed information. 
//                 Dataset 1: ${JSON.stringify(data1)} 
//                 Dataset 2: ${JSON.stringify(data2)}`
//             }
//         ],
//         max_tokens: 2000,
//         temperature: 0.2
//     });

//     const text = response.choices[0].message.content.trim();
//     return text;
// }
// module.exports = { compareData };

// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// const path = require('path');
// async function makeApiRequest() {
//     const filePath = path.join(__dirname, Resume);
//     console.log('Resolved file path:', filePath);  // Debugging line to check path
//     const form = new FormData();
//     form.append('resume', fs.createReadStream(Resume));

//     try {
//         const response = await axios.post('http://localhost:3000/upload', form, {
//             headers: form.getHeaders()
//         });

//         if (response.status === 200) {
//             return response.data; // Return the API response data
//         } else {
//             console.error('API request failed with status:', response.status);
//         }
//     } catch (error) {
//         console.error('Error during API request:', error.response ? error.response.data : error.message);
//     }
// }
// module.exports = { makeApiRequest };

// (async function() {
//     try {
//         // Fetch data from API
//         const apiData = await makeApiRequest();
//         if (!apiData) {
//             console.error('No data available from API response.');
//             return;
//         }

//         // Read data from Excel
    
//         const excelData = readExcelFile(excelPath);

//         // Compare data
//         const comparisonResult = await compareData(excelData, apiData);

//         // Display result
//         console.log('Comparison Result:', comparisonResult);
//     } catch (error) {
//         console.error('Error during comparison:', error.message);
//     }
// })();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const fs = require('fs');
// const path = require('path');
// const { OpenAI } = require('openai');
// const axios = require('axios');
// const FormData = require('form-data');

// // Paths for resume and Job Description JSON files
// const Resume = 'C:/Users/User/Downloads/Ajith.pdf';
// const jobDescriptionPath = 'C:/Users/User/Desktop/jobdescription.json';  // Path to the Job Description JSON file

// // Initialize OpenAI with your API key
// const openai = new OpenAI({
//     apiKey: ''  // Ensure you have set your API key
// });

// // Function to read the Job Description JSON file
// function readJobDescription(filePath) {
//     const jsonData = fs.readFileSync(filePath, 'utf8');
//     return JSON.parse(jsonData);
// }

// // Function to compare Resume data and Job Description using OpenAI
// async function compareData(resumeData, jobDescription) {
//     const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//             {
//                 role: "system",
//                 content: "You are an AI assistant specialized in comparing resumes with job descriptions. Determine how well the resume matches the job description and provide a percentage of similarity."
//             },
//             {
//                 role: "user",
//                 content: `Compare the following resume data with the job description and determine the percentage of match and suitability for the job. 
//                 Resume Data: ${JSON.stringify(resumeData)} 
//                 Job Description: ${JSON.stringify(jobDescription)}`
//             }
//         ],
//         max_tokens: 2000,
//         temperature: 0.2
//     });

//     const text = response.choices[0].message.content.trim();
//     return text;
// }

// // Function to make API request to upload the resume
// async function makeApiRequest() {
//     const filePath = path.join(__dirname, Resume);
//     const form = new FormData();
//     form.append('resume', fs.createReadStream(Resume));

//     try {
//         const response = await axios.post('http://localhost:3000/upload', form, {
//             headers: form.getHeaders()
//         });

//         if (response.status === 200) {
//             return response.data;  // Return the API response data
            

//         } else {
//             console.error('API request failed with status:', response.status);
//         }
//     } catch (error) {
//         console.error('Error during API request:', error.response ? error.response.data : error.message);
//     }
// }

// // Main function to handle the entire process
// (async function() {
//     try {
//         // Fetch resume data from the API
//         const apiData = await makeApiRequest();
//         if (!apiData) {
//             console.error('No data available from API response.');
//             return;
//         }

//         // Read job description from the JSON file
//         const jobDescription = readJobDescription(jobDescriptionPath);

//         // Compare resume data with the job description
//         const comparisonResult = await compareData(apiData, jobDescription);

//         // Display result
//         console.log('Comparison Result:', comparisonResult);
//     } catch (error) {
//         console.error('Error during comparison:', error.message);
//     }
// })();
//////////////////////////////////////TEXT FORMAT//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////JSON FORMAT//////////////////////////////////////////////////////////////////////////////////////

// const fs = require('fs');
// const path = require('path');
// const { OpenAI } = require('openai');
// const axios = require('axios');
// const FormData = require('form-data');

// // Paths for resume and Job Description JSON files
// const Resume = 'C:/Users/User/Downloads/Robin.pdf';
// const jobDescriptionPath = 'C:/Users/User/Desktop/jobDescription.json';  // Path to the Job Description JSON file
// const resultFilePath = 'C:/Users/User/Desktop/comparisonResult.json'; // Path to store the result in JSON format

// // Initialize OpenAI with your API key
// const openai = new OpenAI({
//     apiKey: ''  // Ensure you have set your API key
// });

// // Function to read the Job Description JSON file
// function readJobDescription(filePath) {
//     const jsonData = fs.readFileSync(filePath, 'utf8');
//     return JSON.parse(jsonData);
// }

// // Function to compare Resume data and Job Description using OpenAI
// async function compareData(resumeData, jobDescription) {
//     try {
//         // Convert the data to properly formatted JSON strings
//         const resumeDataString = JSON.stringify(resumeData, null, 2);
//         const jobDescriptionString = JSON.stringify(jobDescription, null, 2);

//         const response = await openai.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are an AI assistant specialized in comparing resumes with job descriptions. Determine how well the resume matches the job description and provide a percentage of similarity."
//                 },
//                 {
//                     role: "user",
//                     content: `Compare the following resume data with the job description and determine the percentage of match and suitability for the job. 
//                     Resume Data: ${resumeDataString} 
//                     Job Description: ${jobDescriptionString}`
//                 }
//             ],
//             max_tokens: 2000,
//             temperature: 0.2
//         });

//         const text = response.choices[0].message.content.trim();
//         return text;
//     } catch (error) {
//         console.error('Error during comparison:', error.message);
//         return null;
//     }
// }

// // Function to make API request to upload the resume
// async function makeApiRequest() {
//     const filePath = path.join(__dirname, Resume);
//     const form = new FormData();
//     form.append('resume', fs.createReadStream(Resume));

//     try {
//         const response = await axios.post('http://localhost:3000/upload', form, {
//             headers: form.getHeaders()
//         });

//         if (response.status === 200) {
//             return response.data;  // Return the API response data
//         } else {
//             console.error('API request failed with status:', response.status);
//         }
//     } catch (error) {
//         console.error('Error during API request:', error.response ? error.response.data : error.message);
//     }
// }

// // Function to store the result in a JSON file
// function storeResultInJSONFile(result, filePath) {
//     const jsonContent = JSON.stringify(result, null, 2);
//     fs.writeFileSync(filePath, jsonContent, 'utf8');
//     console.log('Result saved to', filePath);
// }

// // Main function to handle the entire process
// (async function() {
//     try {
//         // Fetch resume data from the API
//         const apiData = await makeApiRequest();
//         if (!apiData) {
//             console.error('No data available from API response.');
//             return;
//         }

//         // Read job description from the JSON file
//         const jobDescription = readJobDescription(jobDescriptionPath);

//         // Compare resume data with the job description
//         const comparisonResultText = await compareData(apiData, jobDescription);

//         // Create a JSON object to store the result
//         const comparisonResult = {
//             resume: apiData,
//             jobDescription: jobDescription,
//             comparison: comparisonResultText
//         };

//         // Save the result in JSON format
//         storeResultInJSONFile(comparisonResult, resultFilePath);
//     } catch (error) {
//         console.error('Error during comparison:', error.message);
//     }
// })();
/////////////////////////////////////////////////final version//////////////////////////////////////////////////////////

const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const axios = require('axios');
const FormData = require('form-data');

// Paths for resume and Job Description JSON files
const Resume = 'C:/Users/User/Downloads/Archana QA.pdf';
const jobDescriptionPath = 'C:/Users/User/Desktop/jobDescription.json';  // Path to the Job Description JSON file
const resultFilePath = 'C:/Users/User/Desktop/comparisonResult.json'; // Path to store the result in JSON format

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: ''  // Ensure you have set your API key
});

// Function to read the Job Description JSON file
function readJobDescription(filePath) {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
}

// Function to compare Resume data and Job Description using OpenAI
async function compareData(resumeData, jobDescription) {
    try {
        // Convert the data to properly formatted JSON strings
        const resumeDataString = JSON.stringify(resumeData, null, 2);
        const jobDescriptionString = JSON.stringify(jobDescription, null, 2);

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an AI assistant specialized in comparing resumes with job descriptions. Determine how well the resume matches the job description and provide the result in JSON format, including the percentage of similarity and an explanation for the score. You will compare the data for meaning and semantic similarity and not for an exact match. print the candidate name also"
                },
                {
                    role: "user",
                    content: `Compare the following resume data with the job description and return the result in JSON format. 
                    Resume Data: ${resumeDataString} 
                    Job Description: ${jobDescriptionString}`
                }
            ],
            max_tokens: 2000,
            temperature: 0.2
        });

        let text = response.choices[0].message.content.trim();

        // Attempt to find and extract the JSON part from the response
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
            text = text.slice(jsonStart, jsonEnd + 1);  // Extract the JSON portion of the response
        } else {
            throw new Error('No valid JSON found in response');
        }

        const jsonResult = JSON.parse(text);
        return jsonResult;
    } catch (error) {
        console.error('Error during comparison:', error.message);
        return null;
    }
}

// Function to make API request to upload the resume
async function makeApiRequest() {
    const form = new FormData();
    form.append('resume', fs.createReadStream(Resume));

    try {
        const response = await axios.post('http://localhost:3000/upload', form, {
            headers: form.getHeaders()
        });

        if (response.status === 200) {
            return response.data;  // Return the API response data
        } else {
            console.error('API request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error during API request:', error.response ? error.response.data : error.message);
    }
}

// Function to store the result in a file
function storeResultInFile(result, filePath) {
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf8');
    console.log('Result saved to', filePath);
}

// Main function to handle the entire process
(async function() {
    try {
        // Fetch resume data from the API
        const apiData = await makeApiRequest();
        if (!apiData) {
            console.error('No data available from API response.');
            return;
        }

        // Read job description from the JSON file
        const jobDescription = readJobDescription(jobDescriptionPath);

        // Compare resume data with the job description
        const comparisonResult = await compareData(apiData, jobDescription);

        // Display and save the result
        if (comparisonResult) {
            console.log('Comparison Result:', comparisonResult);
            storeResultInFile(comparisonResult, resultFilePath);
        }
    } catch (error) {
        console.error('Error during comparison:', error.message);
    }
})();

