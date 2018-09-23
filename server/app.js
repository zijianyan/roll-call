const express = require('express');
const app = express();
const path = require('path');

const { School, Student } = require('./db').models;

app.use(express.json());

app.use('/api', require('./api'));

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;