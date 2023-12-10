import * as csv from 'csv';
import fs from 'fs';

import assert from 'assert';
import {generate, parse, transform, stringify} from 'csv/sync';

// Run the pipeline
const input = generate({seed: 1, columns: 2, length: 5});
const rawRecords = parse(input);
const refinedRecords = transform(rawRecords, function(data){
  return data.map(function(value){return value.toUpperCase();});
});

const output = stringify(refinedRecords);
console.log(output)
// Print the final result
assert.equal(output, 
  `OMH,ONKCHHJMJADOA
D,GEACHIN
NNMIN,CGFDKB
NIL,JNNMJADNMINL
KB,DMIM
`);

const data = [
  { name: 'John', age: 25, gender: 'M' },
  { name: 'Jane', age: 22, gender: 'F' },
  { name: 'Jim', age: 30, gender: 'M' },
];
const csvData = stringify(data, { header: true });
// csv
// .pipe(csv.stringify({
//     quoted: true
//   }))
// .pipe(process.stdout);
// const csvData = csv.stringify({
//         quoted: true
//       });

fs.writeFile('data.csv', csvData, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('File saved successfully!');
  }
});

// csv
// // Generate 20 records
//   .generate({
//     delimiter: '|',
//     length: 20
//   })
// // Transform CSV data into records
//   .pipe(csv.parse({
//     delimiter: '|'
//   }))
// // Transform each value into uppercase
// //   .pipe(csv.transform((record) => {
// //     return record.map((value) => {
// //       return value.toUpperCase();
// //     });
// //   }))
// // Convert objects into a stream
//   .pipe(csv.stringify({
//     quoted: true
//   }))
// // Print the CSV stream to stdout
//   .pipe(process.stdout);