// // // const supertest = require('supertest');
// // // const FormData = require('form-data');
// // // const fs = require('fs');
// // // const path = require('path');
// // // // const { expect } = require('chai');

// // // describe('api testing', function () {
// // //     it('post api test', async function () {
// // //         const form = new FormData();
// // //         form.append('resume', fs.createReadStream(path.join(__dirname, 'C:/Users/User/Downloads/V.kavin kumar.pdf')));

// // //         await supertest("http://localhost:3000/api/resumeapi")
// // //             .post("/pet")
// // //             .set('Content-Type', 'multipart/form-data')
// // //             // .send(form.getBuffer())
// // //             // .set(form.getHeaders())
// // //             .expect(200)
// // //             .expect('Content-Type', /json/)
// // //             .then(function (response) {
// // //                 expect(response.body.name).to.equal("doggie");
// // //             });
// // //     });
// // // });

// // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// // const axios = require('axios');
// // const FormData = require('form-data');
// // const fs = require('fs');
// // const path = require('path');
// // // const { expect } = require('chai');

// // describe('API testing', function () {
// //     it('POST API test', async function () {
// //         const form = new FormData();
// //         form.append('resume', fs.createReadStream(path.join(__dirname, 'C:/Users/User/Downloads/V.kavinkumar.pdf')));

// //         try {
// //             const response = await axios.post('http://localhost:3000/api/resumeapi', form, {
// //                 headers: form.getHeaders()
// //             });

// //             expect(response.status).to.equal(200);
// //             expect(response.data.name).to.equal("doggie");
// //         } catch (error) {
// //             console.error('Error during API request:', error.response ? error.response.data : error.message);
// //         }
// //     });
// // });

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const filePath1 = 'C:/Users/User/Downloads/Robin.pdf';

describe('API testing', function () {
    it('POST API test', async function () {
        const filePath = path.join(__dirname, filePath1);
        console.log('Resolved file path:', filePath);  // Debugging line to check path

        const form = new FormData();
        form.append('resume', fs.createReadStream(filePath1));

        try {
            const response = await axios.post('http://localhost:3000/upload', form, {
                headers: form.getHeaders()
            });

            expect(response.status).to.equal(200);
            console.log(JSON.stringify(response.data, null, 2));

        } catch (error) {
            console.error('Error during API request:', error.response ? error.response.data : error.message);
        }
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// const path = require('path');
// // const { expect } = require('chai');

// describe('API testing', function () {
//     it('POST API test', async function () {
//         const filePath = path.join('C:/Users/User/Downloads/Robin.pdf');
//         console.log('Resolved file path:', filePath);

//         // Check if the file exists
//         if (!fs.existsSync(filePath)) {
//             console.error('File does not exist:', filePath);
//             return;
//         }

//         const form = new FormData();
//         form.append('resume', fs.createReadStream(filePath));

//         try {
//             const response = await axios.post('http://localhost:3000/api/resumeapi', form, {
//                 headers: form.getHeaders(),
//                 timeout: 5000
//             });

//             expect(response.status).to.equal(200);

//             // Extracted data and formatting it
//             const extractedData = response.data.extractedData;
//             const formattedData = {
//                 persons: extractedData.persons.map(person => ({
//                     first_name: person.first_name || "Not Provided",
//                     middle_name: person.middle_name || "",
//                     last_name: person.last_name || "Not Provided",
//                     email: person.email || "Not Provided",
//                     phone_number: person.phone_number || "Not Provided",
//                     key_skills: person.key_skills || [],
//                     years_of_experience: person.years_of_experience || "Not Provided",
//                     experience_summary: person.experience_summary || "Not Provided",
//                     employment_history: person.employment_history.map(history => ({
//                         organization: history.organization,
//                         role: history.role,
//                         start_date: history.start_date,
//                         end_date: history.end_date
//                     })) || [],
//                     education: person.education.map(edu => ({
//                         institution: edu.institution,
//                         degree: edu.degree,
//                         field_of_study: edu.field_of_study || "Not Provided",
//                         start_date: edu.start_date || "Not Provided",
//                         end_date: edu.end_date
//                     })) || [],
//                     achievements: person.achievements || [],
//                     certifications: person.certifications || []
//                 }))
//             };

//             console.log('Formatted data:', JSON.stringify(formattedData, null, 4));
//             console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')

            
//         } catch (error) {
//             if (error.response) {
//                 console.error('Error during API request:', error.response.data);
//             } else if (error.request) {
//                 console.error('No response received:', error.request);
//             } else {
//                 console.error('Error during API request:', error.message);
//             }

//             if (error.code === 'ECONNRESET') {
//                 console.error('Connection was reset by the server');
//             }
//         }
//     });
// });
