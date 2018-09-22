const express = require('express');
const router = express.Router();

const { School, Student } = require('../db').models;

router.get('/', (req, res, next)=> {
  School.findAll({ include: [ Student ]})
    .then(schools => res.send(schools))
    .catch(next);
});

router.get('/:id', (req, res, next)=> {
  School.findById(req.params.id, { include: [ Student ]})
    .then(school => res.send(school))
    .catch(next);
});

router.delete('/:id', (req, res, next)=> {
  School.findById(req.params.id)
    .then(school => school.destroy())
    .then(()=> res.sendStatus(204))
    .catch(next);
});

router.post('/', (req, res, next)=> {
  // console.log('schools post, req.body:', req.body);
  School.create(req.body)
    .then(created => res.status(201).send(created))
    .catch(next);
});

module.exports = router;