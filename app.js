require("dotenv").config()
const express = require("express");
const app = express();

//middle ware
const morgan = require('morgan');
app.use(morgan('dev'));

//importing client from db
// const { client } = require('./db/client.js');

//assinging port and making connection
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // client.connect();
    console.log(`Listening on PORT ${PORT}`);
})

module.exports = app;
