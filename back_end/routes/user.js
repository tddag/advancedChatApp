const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretOrKey = require('../config/keys').secretOrKey

// get all users
router.get('/get/all', (req, res) => {
  User.find({}, (err, users) => {
    if (users) {
      res.status(200).json(users)
    }
  })
})

// register user
router.post('/register', (req, res) => {
  let { name, email, password } = req.body

  User.findOne({email})
    .then(user => {
      if(!user){
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if(err){
              res.status(400).json(err)
            } else {
              let newUser = new User({
                name: name,
                email: email,
                password: hash
              })
              newUser.save()
                .then(() => res.status(200).json(user))
            }
          })
        })
      } else {
        res.status(400).json({msg: 'Email is already used'})
        console.log('Email is already used')
      }
    })
})

// login user
router.post('/login', (req, res) => {
  let { email, password } = req.body

  User.findOne({email})
    .then(user => {
      console.log(user)
      if(user){
        console.log(password)
        bcrypt.compare(password, user.password)
          .then(match => {
            if(match){
              let payload = {
                name: user.name,
                email: user.email
              }
              jwt.sign(payload, secretOrKey, { expiresIn: 60*60*24 }, (err, token) => {
                if(err){
                  res.status(400).json(err)
                } else {
                  res.status(200).json(token)
                  console.log('hooray')
                }
              })
            } else {
              res.status(400).json({msg: 'Password is not matched'})
              console.log('Password is not matched')
            }
          })
      } else {
        res.status(400).json({msg: 'Email cannot be found'})
        console.log('Email cannot be found')
      }
    })
})

module.exports = router
