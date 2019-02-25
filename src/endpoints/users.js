const express = require('express');

const router = express.Router();

const User = require('../models/User.js');

const bcrypt = require('bcrypt');

const passport = require('passport');


// GET
router.get('/', (req, res, next) => {
  User.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      throw new Error(error);
    });
});

// GET:id
router.get('/:id', (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      throw new Error(error);
    });
});


// PUT

// PATCH

// DELETE



// AUTH-ROUTES --- POSTS ROUTES + GET /loggedin

// POST - SIGNUP
router.post('/signup', (req, res, next) => {
  const { name, username, birthDate, password } = req.body;

  if (!name || !username || !birthDate || !password) {
    res.status(400).json({ message: 'Please fill all required fields' });
    return;
  }
  if (password.length < 5) {
    res.status(400).json({ message: 'Please make your password at least 6 characters long for security purposes.' });
    return;
  }

  User.findOne({ username }, (err, found) => {
    if (err) {
      res.status(500).json({ message: "Email check went bad." });
      return;
    }
    if (found) {
      res.status(400).json({ message: 'Email already taken. Please choose another one.' });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      name,
      username,
      birthDate,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Saving user to database went wrong.' });
        return;
      }
    });

    // automatic login after sign up. login() after req is form passport.
    req.login(newUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Login after signup went bad.' });
        return;
      }
      res.status(200).json(newUser);
    });
  });
});

// POST - LOGIN
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, userEmail, failureDet) => {
    if (err) {
      res.status(500).json({ message: 'email authentication got wrong' });
      return;
    }
    if (!userEmail) {
      res.status(401).json(failureDet);
    }

    // save email in session
    req.login(userEmail, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }
      res.status(200).json(userEmail);
    });
  })(req, res, next)
})

// POST - LOGOUT
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' })
});

// GET protected routes
router.get('loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user.email);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;
