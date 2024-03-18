// Import the csv2json function from the csv2json.js file
const csv2json = require("./csv2json.js");

// Define the sample CSV data
const csv = `name.firstName, name.lastName, age, address.line1, address.line2, address.city, address.state, gender 
Rohit, Prasad, 35, A-563 Rakshak Society, New Pune Road, Pune, Maharashtra, male`;

// Convert the CSV data to JSON using csv2json function
const json = csv2json(csv, { parseNumbers: true });

// Define the expected JSON output
const expected = [
    {
        name: {
            firstName: "Rohit",
            lastName: "Prasad",
        },
        age: "35",
        address: {
            line1: "A-563 Rakshak Society",
            line2: "New Pune Road",
            city: "Pune",
            state: "Maharashtra",
        },
        gender: "male",
    },
];

// Display the expected output
console.log("==Expected==");
console.log(JSON.stringify(expected, null, 2));

// Display the actual output after execution of csv2json function
console.log("==Execution==");
console.log(JSON.stringify(json, null, 2));

// Compare the actual output with the expected output
console.log("==Result==");
if (JSON.stringify(json) === JSON.stringify(expected)) {
    console.log("Success!");
} else {
    console.log("Failed.");
}