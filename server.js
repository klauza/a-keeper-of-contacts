const express = require('express');
const connectDB = require('./config/db');

const app = express();  // initialize express

// connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // now we can accept body data

// adding a router / endpoint:
app.get('/', (req, res) => req.send('<h1>Hello there</h1>'));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
