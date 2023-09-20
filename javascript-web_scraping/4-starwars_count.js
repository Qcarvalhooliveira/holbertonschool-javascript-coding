#!/usr/bin/node
const request = require('request');
const url = process.argv[2];
const id = 18;

request(url, function (err, response, body) {
  if (err) {
    console.log(err);
  }
  const filmsData = JSON.parse(body).results;
  const WithWedgeAntilles = filmsData.filter(film =>
    film.characters.includes(`https://swapi-api.hbtn.io/api/people/${id}/`)
  );

  console.log(WithWedgeAntilles.length);
});
