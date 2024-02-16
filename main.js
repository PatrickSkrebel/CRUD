// imports

const User = require('./models/users');

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");


const app = express();
const PORT = process.env.PORT || 4000;

// Database connection
/*
mongoose.connect(process.env.DB_URI, {useNewURLParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the database"));
*/

// New Database connection
mongoose.connect('mongodb://localhost:27017/node_crud')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
}));
app.use(bodyParser.urlencoded({ extended: false })); // Apply body-parser middleware
app.use(bodyParser.json()); // Apply body-parser middleware

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


// set template engine
app.set('view engine', 'ejs');

// Route prefix
app.use("", require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
