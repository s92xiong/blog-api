require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");

const mongoDB = process.env.MONGODB_URI;

// Establish db connection
mongoose.connect(`${mongoDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
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