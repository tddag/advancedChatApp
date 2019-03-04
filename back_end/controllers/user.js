const User = require('../models/User')

const registerUser = (io, data) => {
  console.log(data.name)
  User.findOne({ name: data.name }).then(user => {
    if (user) {
      io.sockets.emit('registerFail', {
        message: 'User is existed',
      })
    } else {
      const newUser = new User({
        name: data.name,
      })
      newUser.save()
      io.sockets.emit('registerSucces', {
        message: 'Register successfully',
        newUser: newUser,
      })
    }
  })
}

module.exports = registerUser
