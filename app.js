require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");

const MONGODB_URI = `mongodb+srv://s92xiong:s92xiong-blog-api@cluster0.xfmld.mongodb.net/blog-api-db?retryWrites=true&w=majority`;

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

app.use('/', routes);

module.exports = app;