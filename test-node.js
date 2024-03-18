const csv2json = require('./csv2json.js');
const csv = `name.firstName, name.lastName, age, address.line1, address.line2, address.city, address.state, gender 
Rohit, Prasad, 35, A-563 Rakshak Society, New Pune Road, Pune, Maharashtra, male`;
const json = csv2json(csv, { parseNumbers: true });
const expected = [
  {
    "name": {
      "firstName": "Rohit",
      "lastName": "Prasad"
    },
    "age": "35",
    "address": {
      "line1": "A-563 Rakshak Society",
      "line2": "New Pune Road",
      "city": "Pune",
      "state": "Maharashtra"
    },
    "gender": "male"
  }
];
console.log('==Expected==');
console.log(JSON.stringify(expected, null, 2));
console.log('==Execution==');
console.log(JSON.stringify(json, null, 2));
console.log('==Result==');
if (JSON.stringify(json) == JSON.stringify(expected)) {
  console.log('Success!');
} else {
  console.log('Failed.');
}