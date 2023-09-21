#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request(url, function (err, response, body) {
  if (err) {
    console.log(err);
  }
  const tasksData = JSON.parse(body);
  const completedTasks = {};

  tasksData.forEach(task => {
    if (task.completed) {
      if (!completedTasks[task.userId]) {
        completedTasks[task.userId] = 1;
      } else {
        completedTasks[task.userId]++;
      }
    }
  });
  console.log(completedTasks);
});
