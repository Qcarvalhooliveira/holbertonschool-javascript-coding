const express = require('express');
const students = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  students(process.argv[2])
    .then((data) => {
      const response = `This is the list of our students\n${data}`;
      res.send(response);
    })
    .catch((error) => {
      res.status(500).send(`This is the list of our students\nCannot load the database\n${error.message}`);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
