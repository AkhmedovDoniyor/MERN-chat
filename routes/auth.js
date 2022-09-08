const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const loginMiddleware = require('../middleware/login');

router.get('/protected', loginMiddleware, (req, res) => {
  res.send('Hello User!');
})

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!email || !password || !name) {
    res.status(422).json({ error: "Please provide all the fields" });
  }
  // if(name.length < 5) {
  //   res.status(422).json({ error: "Please enter more than 5 characters" })
  // }
  // if(password.length < 7) {
  //   res.status(422).json({ error: "Please enter more than 7 characters" })
  // }
  User.findOne({ email: email })
    .then(savedUser => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exists" });
      }
      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name,
            email,
            password: hashedPassword,
            pic,
          });
          user.save()
            .then(user => {
              res.json({ message: "Success" });
            })
            .catch(err => {
              console.log(err);
            });
        })
    })

})

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please provide all the fields" });
  }
  User.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser) {
        return res.status(422).json({ error: "User does not exist" });
      }
      bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const { _id, name, email, password, following, followers, pic } = savedUser;
            res.json({ token, user: { _id, name, email, password, following, followers, pic } });
            res.json({ message: "Login successful" });
          } else {
            return res.status(422).json({ error: "Password does not match" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    })
})


module.exports = router;