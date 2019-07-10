const mongoose = require('mongoose');
const config = require('config');           // we need access to global variable
const db = config.get('mongoURI');  // initializing

// function
// mongoose returns promises, 
// 1) without async, await 
/*
const connectDB = () => {
  mongoose.connect(db, {
    // to avoid warnings, need these 3 parameters:
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
}

// 2) with async, await 
*/
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      // to avoid warnings, need these 3 parameters:
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB connected! :> ');

  } catch (err) {
      console.error(err.message);
      process.exit(1);
  }
}
module.exports = connectDB;
// after that, import it into server.js