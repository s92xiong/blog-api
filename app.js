const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// Establish db connection
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Successfully connected ");
}).catch((error) => {
  console.log(`can not connect to database, ${error}`);
});


const routes = require('./routes/routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Render the index.html file in public folder?
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;