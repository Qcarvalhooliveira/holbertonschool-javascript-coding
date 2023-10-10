const http = require('http');
const students = require('./3-read_file_async');

const port = 1245;

const app = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello Holberton School!');
      break;
    case '/students':
      students(process.argv[2])
        .then((data) => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write('This is the list of our students\n');
          res.write(data);  // Writing the data directly (assuming it's plain text)
          res.end();
        })
        .catch((error) => {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`Error: ${error.message}`);
        });
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Resource not found' }));
  }
});

app.listen(port);

module.exports = app;
