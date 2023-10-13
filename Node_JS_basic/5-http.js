const http = require('http');
const countStudents = require('./3-read_file_async');

const port = 1245;

const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  switch (req.url) {
    case '/':
      res.end('Hello Holberton School!');
      break;
    case '/students':
      try {
        const data = await countStudents('./database.csv');
        const response = `This is the list of our students\n${data.join('\n')}`;
        res.end(response);
      } catch (error) {
        res.statusCode = 500;
        res.end(`Error: ${error.message}`);
      }
      break;
    default:
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Resource not found' }));
  }
});

app.listen(port);

module.exports = app;
