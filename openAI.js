// // const XLSX = require('xlsx');

// // function readExcelFile(filePath) {
// //     const workbook = XLSX.readFile(filePath);
// //     const sheetName = workbook.SheetNames[0];
// //     const sheet = workbook.Sheets[sheetName];
// //     return XLSX.utils.sheet_to_json(sheet);
// // }

// // module.exports = { readExcelFile };
// // // compareData.js
// // const { OpenAI } = require('openai');
// // const openai = new OpenAI({ apiKey: ''});

// // async function compareData(data1, data2) {
// //     const response = await openai.chat.completions.create({
// //         model: "gpt-4",
// //         messages: [
// //             {
// //                 role: "system",
// //                 content: "You are an AI assistant specialized in comparing datasets. Determine whether the datasets match and provide a percentage of similarity. You will compare the data for meaning and semantic similarity and not for exact match"
// //             },
// //             {
// //                 role: "user",
// //                 content: `Compare the following two datasets and determine if they match and the percentage of similarity. 
// //                 Dataset 1: ${JSON.stringify(data1)} 
// //                 Dataset 2: ${JSON.stringify(data2)}`
// //             }
// //         ],
// //         max_tokens: 2000,
// //         temperature: 0.2
// //     });

// //     const text = response.choices[0].message.content.trim();
// //     return text;
// // }

// // module.exports = { compareData };

// // // test/compareDataTest.js
// // // const { readExcelFile } = require('../readExcel');
// // // const { compareData } = require('../compareData');

// // module.exports = {
// //     'Compare Data Test': async function(browser) {
// //         const data1 = readExcelFile('C:/Users/User/Desktop/LLM/Testdata1.xlsx');
// //         const data2 = readExcelFile('C:/Users/User/Desktop/LLM/Testdata.xlsx');

// //         const comparisonResult = await compareData(data1, data2);

// //         console.log('Comparison Result:', comparisonResult);

// //         // Example assertion
// //         // browser.assert.ok(comparisonResult.includes('percentage'), 'Comparison result contains percentage');
// //     }
// // };

// // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const XLSX = require('xlsx');

// // Function to read the Excel file
// function readExcelFile(filePath) {
//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     return XLSX.utils.sheet_to_json(sheet);
// }

// module.exports = { readExcelFile };
// // Assuming GPT-4o Mini is accessible via some other API or library
// const { GPT4oMini } = require('gpt4o-mini'); // Hypothetical library name

// // Initialize GPT-4o Mini with your API key
// const gpt4oMini = new GPT4oMini({
//     apiKey: ''  // Ensure you have set your API key
// });

// async function compareData(data1, data2) {
//     // Hypothetical API request similar to OpenAI
//     const response = await gpt4oMini.compareDatasets({
//         model: "gpt-4o-mini",  // Hypothetical model name
//         input: {
//             dataset1: data1,
//             dataset2: data2,
//         },
//         options: {
//             semanticComparison: true,
//             similarityPercentage: true
//         }
//     });

//     const text = response.similarityReport.trim();  // Hypothetical response structure
//     return text;
// }

// module.exports = { compareData };
// // const { readExcelFile } = require('../readExcel');
// // const { compareData } = require('../compareData');

// module.exports = {
//     'Compare Data Test': async function(browser) {
//         const data1 = readExcelFile('C:/Users/User/Desktop/LLM/Testdata1.xlsx');
//         const data2 = readExcelFile('C:/Users/User/Desktop/LLM/Testdata.xlsx');

//         const comparisonResult = await compareData(data1, data2);

//         console.log('Comparison Result:', comparisonResult);

//         // Example assertion
//         // browser.assert.ok(comparisonResult.includes('percentage'), 'Comparison result contains percentage');
//     }
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const XLSX = require('xlsx');

// Function to read the Excel file
function readExcelFile(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}

module.exports = { readExcelFile };

// compareData.js
const { OpenAI } = require('openai');

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: ''  // Ensure you have set your API key
});

async function compareData(data1, data2) {
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            {
                role: "system",
                content: "You are an AI assistant specialized in comparing datasets. Determine whether the datasets match and provide a percentage of similarity. You will compare the data for meaning and semantic similarity and not for an exact match. In the end give me a JSON format for how good the resume matches the Job description using percentage."
            },
            {
                role: "user",
                content: `Compare the following two datasets and determine if they match and the percentage of similarity. 
                Dataset 1: ${JSON.stringify(data1)} 
                Dataset 2: ${JSON.stringify(data2)}`
            }
        ],
        max_tokens: 2000,
        temperature: 0.2
    });

    const text = response.choices[0].message.content.trim();
    return text;
}

module.exports = { compareData };

// test/compareDataTest.js
// const { readExcelFile } = require('../readExcel');
// const { compareData } = require('../compareData');

module.exports = {
    'Compare Data Test': async function() {
        const data1 = readExcelFile('C:/Users/User/Desktop/LLM/Testdata1.xlsx');
        const data2 = readExcelFile('C:/Users/User/Desktop/LLM/Testdata.xlsx');

        const comparisonResult = await compareData(data1, data2);

        console.log('Comparison Result:', comparisonResult);

        // Example assertion
        // browser.assert.ok(comparisonResult.includes('percentage'), 'Comparison result contains percentage');
    }
};
