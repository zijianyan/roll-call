const express = require('express');
const router = express.Router();

const { School, Student } = require('../db').models;

router.get('/', (req, res, next)=> {
  Student.findAll({ include: [ School ]})
    .then(students => res.send(students))
    .catch(next);
});

module.exports = router;