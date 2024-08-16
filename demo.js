const XLSX = require('xlsx');
module.exports = { readExcelFile };
function readExcelFile(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}
module.exports = { makeApiRequest };
async function makeApiRequest() {
    const filePath1 = 'C:/Users/User/Downloads/john.pdf';
    const filePath = path.join(__dirname, filePath1);
    console.log('Resolved file path:', filePath);  // Debugging line to check path

    const form = new FormData();
    form.append('resume', fs.createReadStream(filePath1));

    try {
        const response = await axios.post('http://localhost:3000/upload', form, {
            headers: form.getHeaders()
        });

        if (response.status === 200) {
            return response.data; // Return the API response data
        } else {
            console.error('API request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error during API request:', error.response ? error.response.data : error.message);
    }

module.exports = { compareData };
const { OpenAI } = require('openai');

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: ''  // Ensure you have set your API key
});

async function compareData(data1, data2) {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: "You are an AI assistant specialized in comparing datasets. Determine whether the datasets match and provide a percentage of similarity. You will compare the data for meaning and semantic similarity and not for an exact match."
            },
            {
                role: "user",
                content: `Compare the following two datasets and determine if they match and the percentage of similarity and give detailed information. 
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
(async function() {
    try {
        // Fetch data from API
        const apiData = await makeApiRequest();
        if (!apiData) {
            console.error('No data available from API response.');
            return;
        }

        // Read data from Excel
        const excelData = readExcelFile('C:/Users/User/Desktop/Resumedata.xlsx');

        // Compare data
        const comparisonResult = await compareData(excelData, apiData);

        // Display result
        console.log('Comparison Result:', comparisonResult);
    } catch (error) {
        console.error('Error during comparison:', error.message);
    }
})();
}



