const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/user');


router.post('/join', (req, res) => {

    const data = {};

    User.findOne({ username: req.body.username })
        .then(user => {
            if(user) {
                data.message = 'Пользователь уже зарегистрирован';
                return res.status(400).json(data);
            } else {
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;      
                        newUser
                            .save()
                            .then(user => {
                              const payload = {
                                id: user._id,
                                name: user.username
                              }
                              jwt.sign(payload, process.env.JwtSecret, { expiresIn: 3600 }, (err, token) => {
                                if(err) throw err;

                                data.jwt = token;          
                                data.user = user.username;
                                res.status(200).json(data);
                              });

                            })
                            .catch(err => res.json(err));
                        });
                });
            }
        })
        .catch(err => res.json(err));
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const data = {};
  
    // Find User by email
    User.findOne({ username })
      .then(user => {
        // Check for user
        if(!user) {
          data.message = 'Пользователь не найден';
          return res.status(404).json(data);
        }
  
        // Check Password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch) {
              // User Matched
              const payload = {
                id: user._id,
                name: user.username
              }
  
              // Sign Token
              jwt.sign(payload, process.env.JwtSecret, { expiresIn: 3600 }, (err, token) => {
                if(err) throw err;

                data.jwt = token;
                data.user = user.username;
                return res.status(200).json(data);
              });
            } else {
              data.message = 'Неверный пароль'
              return res.status(400).json(data)
            }
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
});

router.get('/profile', (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JwtSecret, (err, decoded) => {
    if(err) return console.error(err);
    res.json({ user: decoded.name })
  });
});

module.exports = router;