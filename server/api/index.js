const express = require('express');
const router = express.Router();

const { syncAndSeed } = require('../db'); //for /api/reset 

router.use('/schools', require('./schools'));
router.use('/students', require('./students'));

router.post('/reset', (req, res, next)=> {
  syncAndSeed()
    .then(()=> res.sendStatus(204))
    .catch(next);
});

module.exports = router;