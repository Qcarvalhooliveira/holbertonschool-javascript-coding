const fs = require('fs');

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, dataDb) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (dataDb) {
        const inFields = {};
        const data = dataDb.split('\n');
        console.log(`Number of students: ${data.length - 1}`);

        for (let i = 1; i < data.length; i += 1) {
          const line = data[i].split(',');
          if (inFields[line[3]]) {
            inFields[line[3]].counter += 1;
            inFields[line[3]].students.push(` ${line[0]}`);
          } else {
            inFields[line[3]] = { counter: 1, students: [`${line[0]}`] };
          }
        }
        for (const key in inFields) {
          if (Object.prototype.hasOwnProperty.call(inFields, key)) {
            console.log(`Number of students in ${key}: ${inFields[key].counter}. List: ${inFields[key].students}`);
          }
        }
        resolve({ inFields, counter: data.length - 1 });
      }
    });
  });
}

module.exports = readDatabase;
