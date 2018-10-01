const express = require('express');
const router = express.Router();

const { Student } = require('../db').models;

router.get('/', (req, res, next)=> {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});

router.get('/:id', (req, res, next)=> {
  Student.findById(req.params.id)
    .then(student => res.send(student))
    .catch(next);
});

router.delete('/:id', (req, res, next)=> {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(()=> res.sendStatus(204))
    .catch(next);
});

router.post('/', (req, res, next)=> {
  Student.create(req.body)
    .then(created => res.status(201).send(created))
    .catch(next);
});

router.post('/random', (req, res, next)=> {
  Student.createRandom()
    .then(created => res.status(201).send(created))
    .catch(next);
});

router.put('/:id', (req, res, next)=> {

  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(updated => res.send(updated))
    .catch(next);
});

module.exports = router;