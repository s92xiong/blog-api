require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");

const MONGODB_URI = `mongodb+srv://s92xiong:${process.env.MONGODB_URI_pw}@cluster0.xfmld.mongodb.net/${process.env.MONGODB_URI_db}?retryWrites=true&w=majority`

// Establish db connection
mongoose.connect(`${MONGODB_URI}`, {
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