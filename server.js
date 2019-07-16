const express = require('express');
const connectDB = require('./config/db');
const app = express();  // initialize express

const path = require('path'); // node js default module for dealing with paths



// connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // now we can accept body data

// adding a router / endpoint:
// app.get('/', (req, res) => req.send('<h1>Hello there</h1>'));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production'){    // check the environment
  // set static folder (build folder)
  app.use(express.static('client/build'));

  // create a route except the "Define Routes", thats why we put it below them
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) ); // __dirname = look at the current directory, and then 'client', then ...
}

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
