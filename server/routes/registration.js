const UserRegistration = require('../models/registrationSchema');

const express = require('express');
const router = express.Router();

//fetch
router.get('/', (req, res) => {
  UserRegistration.find((err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

//add
router.post('/create', (req, res) => {
  const userRegistration = new UserRegistration(req.body);
  console.log(req.body);
  userRegistration
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

//fetch spcific item
router.get('/:id', (req, res) => {
  const id = req.params.id;
  UserRegistration.findById(id, (err, user) => {
    res.json(user);
  });
});

//update specific item
router.put('/:id', (req, res) => {
  const id = req.params.id;
  UserRegistration.findById(id, (err, user) => {
    if (!user) {
      res.status(404).send('User not found');
    } else {
      user.text = req.body.text;
      user
        .save()
        .then((user) => {
          res.json(user);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

//delete one user
router.delete('/user/:id', (req, res) => {
  // res.send('Got a DELETE request at /user/:id');
  console.log('Got a DELETE request at /user/:id');
});

module.exports = router;
