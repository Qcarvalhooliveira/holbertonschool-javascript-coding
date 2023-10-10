const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Holberton School!\n');
});

const port = 1245;
const hostname = '127.0.0.1';

app.listen(port, hostname, () => {
  console.log(`Server is listening on http://${hostname}:${port}/`);
});

module.exports = app;
