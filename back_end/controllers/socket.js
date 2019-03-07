const Socket = require('../models/Socket')

const saveSocket = (eventType, createdAt, createdBy, createIn, desc = '') => {
  return new Socket({
    eventType: eventType,
    createdAt: createdAt,
    createdBy: createdBy,
    createIn: createIn,
    desc: desc,
  }).save()
}

module.exports = { saveSocket: saveSocket }
