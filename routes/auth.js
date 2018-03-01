'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user');

// --- GET me
router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(404).json({error: 'not-found'});
  }
});

// --- POST login
router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({error: 'unauthorized'});
  }

  const username = req.body.username;
  const password = req.body.password;

  // --- validation error - false password or false username
  if (!username || !password) {
    return res.status(422).json({error: 'validation'});
  }
  // --- find the user in data base
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        // --- validation error - user not found
        return res.status(404).json({error: 'User not found'});
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.json(user);
      } else {
        // --- validation error - password is false
        return res.status(404).json({error: 'Password is false'});
      }
    })
    .catch(next);
});

// --- POST signup
router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({error: 'unauthorized'});
  }

  const username = req.body.username;
  const password = req.body.password;

  // --- validation error - false password or false username
  if (!username || !password) {
    return res.status(422).json({error: 'validation'});
  }

  // --- find the user in data base
  User.findOne({username}, 'username')
    .then((userExists) => {
      if (userExists) {
        // --- validation error - username is taken
        return res.status(422).json({error: 'Username is not unique'});
      }
      // --- encryption
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = User({
        username,
        password: hashPass
      });

      // --- save new user in data base
      return newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.json(newUser);
        });
    })
    .catch(next);
});

// --- POST logout
router.post('/logout', (req, res) => {
  req.session.currentUser = null;
  return res.status(204).send();
});

module.exports = router;
