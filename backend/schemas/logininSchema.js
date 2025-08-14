const mongoose = require('mongoose');
const { email, string } = require('zod');

const LogInSchema = mongoose.Schema({
    email:email,
    password:string
})

module.exports = mongoose.model('login',LogInSchema);