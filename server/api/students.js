const express = require('express');
const router = express.Router();

const { School, Student } = require('../db').models;

router.get('/', (req, res, next)=> {
  Student.findAll({include: [ School ]})
    .then(students => res.send(students))
    .catch(next);
});

router.get('/:id', (req, res, next)=> {
  Student.findById(req.params.id, { include: [ School ]})
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
    .then(created => {
      console.log('student POST, created:', created);
      res.status(201).send(created)
    })
    .catch(next);
});

router.put('/:id', (req, res, next)=> {
  // console.log('students put, req.body:', req.body);
  // console.log('students put, req.params.id:', req.params.id); 
  Student.findById(req.params.id, {
      // include: [ School ]
     })
    .then(student => {
      // console.log('students put, found student:', student.dataValues);
      return student.update(req.body)
    })
    .then(updated => res.send(updated))
    .catch(next);
});

module.exports = router;