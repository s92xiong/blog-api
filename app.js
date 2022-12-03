const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const routes = require('./routes/routes');
const { connectDB } = require('./connectDB');
require("dotenv").config();

const app = express();
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Render the index.html file in public folder?
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;