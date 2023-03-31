require("dotenv").config()
const express = require("express");
const app = express();

//middle ware
const morgan = require('morgan');
app.use(morgan('dev'));

//importing client from db

//assinging port and making connection

module.exports = app;
