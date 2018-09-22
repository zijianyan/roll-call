const express = require('express');
const app = express();
const path = require('path');

const { School, Student } = require('./db').models;

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/api/schools', (req, res, next)=> {
  School.findAll({ include: [ Student ]})
    .then(schools => res.send(schools))
    .catch(next);
});

app.get('/api/students', (req, res, next)=> {
  Student.findAll({ include: [ School ]})
    .then(students => res.send(students))
    .catch(next);
});

module.exports = app;