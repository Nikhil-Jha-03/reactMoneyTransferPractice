// import mongoose from 'mongoose';
const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/PaytmSimpleClone').
        then(() => {
            console.log("Running",)
        })
        .catch(() => {
            console.log("error")
        })
