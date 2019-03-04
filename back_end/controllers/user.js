const User = require('../models/User')

const registerUser = (io, data) => {
  console.log(data.name)
  if (data.name == '') {
    io.sockets.emit('registerFail', {
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

module.exports = registerUser
