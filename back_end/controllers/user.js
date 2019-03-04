const User = require('../models/User')

const registerUser = (io, data) => {
  console.log(data.name)
  if (data.name == '') {
    io.emit('registerFail', {
      message: 'Cannot be blank',
    })
  } else {
    User.findOne({ name: data.name }).then(user => {
      if (user) {
        io.emit('registerFail', {
          message: 'User is already existed',
          user: user,
        })
      } else {
        const newUser = new User({
          name: data.name,
        })
        newUser.save()
        io.emit('registerSuccess', {
          message: 'Register successfully',
          newUser: newUser,
        })
      }
    })
  }
}

const checkHandle = (io, data) => {
  if (data.user == '') {
    io.emit('checkFail', {
      message: 'Cannot be blank',
    })
  } else {
    User.findOne({ name: data.user }).then(user => {
      if (user) {
        io.emit('checkSuccess', {
          message: 'Login successfully',
          user: user,
        })
      } else {
        io.emit('checkFail', {
          message: 'User cannot be found',
        })
      }
    })
  }
}

module.exports = {
  registerUser: registerUser,
  checkHandle: checkHandle,
}
