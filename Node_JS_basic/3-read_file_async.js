const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        if (lines.length === 1 && lines[0].trim() === '') {
          resolve([]); // Database is empty
        } else {
          const counters = {};

          for (let i = 1; i < lines.length; i += 1) {
            const [firstName, , , field] = lines[i].split(',');
            if (field) {
              counters[field] = counters[field] || { count: 0, names: [] };
              counters[field].count += 1;
              counters[field].names.push(firstName.trim());
            }
          }

          const studentsInfo = Object.keys(counters).map((field) => {
            return `Number of students in ${field}: ${counters[field].count}. List: ${counters[field].names.join(', ')}`;
          });

          resolve(studentsInfo);
        }
      }
    });
  });
}

module.exports = countStudents;

