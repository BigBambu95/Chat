const express = require('express');
const router = express.Router();
const io = require('../index').io;

const User = require('../models/User');

router.get('/', (req, res, next) => {

    console.log('chat')
    
  

    res.send('chat');
});

module.exports = router;