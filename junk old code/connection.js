'use strict'
require('dotenv').config();
const mongoose = require('mongoose');
const MONGOURI = process.env.MONGOURI;
const connectDB = async() => {
    await mongoose.connect(MONGOURI,{
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true} );
};

module.exports = connectDB;