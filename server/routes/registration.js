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
      user.firstName = req.body.firstName;
      user.middleName = req.body.middleName;
      user.lastName = req.body.lastName;
      user.sex = req.body.sex;
      user.email = req.body.email;
      user.address = req.body.address;
      user.telephoneNum = req.body.telephoneNum;
      user.phoneNumber = req.body.phoneNumber;

      user
        .save()
        .then((user) => {
          res.json(user);
        })
        .catch((err) => res.status(500).send(err.message));
      // console.log(user);
      // console.log(req.body);
    }
  });
});

//delete one user
router.delete('/:id', (req, res) => {
  UserRegistration.findOne(req.params._id)
    .then((user) => {
      if (user) {
        user
          .remove()
          .then((user) => {
            res.status(200).json(`User deleted! Deleted User details: ${user}`);
          })
          .catch((err) => {
            res
              .status(400)
              .send(`Delete not possible. Error details: ${err.message}`);
          });
      } else {
        res.status(404).send(`User not found. Error details: ${err.message}`);
      }
    })
    .catch((err) => {
      res.status(500).send(`Error details: ${err.message}`);
    });
});
module.exports = router;
