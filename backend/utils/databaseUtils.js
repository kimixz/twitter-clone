const mongoose = require('mongoose')

const connectToDatabase = async connection => {
  try {
    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to database.')
  } catch (ex) {
    console.log(ex)
  }
}

module.exports = { connectToDatabase }
