const http = require('http');
const countStudents = require('./3-read_file_async');

const port = 1245;

const app = http.createServer((req, res) => {
  const { method, url } = req;
  if (method === 'GET' && url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello Holberton School!');
    res.end();
  }
  if (method === 'GET' && url === '/students') {
    countStudents(String(process.argv.slice(2)))
      .then((arrayOfClasses) => {
        res.write('This is the list of our students\n');
        for (const cls in arrayOfClasses) {
          if (cls !== 'count') {
            res.write(`Number of students in ${cls}: ${arrayOfClasses[cls].count}. List: ${arrayOfClasses[cls].names.join(', ')}\n`);
          }
        }
        res.end();
      })
      .catch((err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`This is the list of our students\nCannot load the database\n${err.message}`);
      });
  }
});

app.listen(port);

module.exports = app;
