const express = require('express');
const router = express.Router();

const { School, Student } = require('../db').models;

router.get('/', (req, res, next)=> {
  School.findAll({ include: [ Student ]})
    .then(schools => res.send(schools))
    .catch(next);
});

module.exports = router;