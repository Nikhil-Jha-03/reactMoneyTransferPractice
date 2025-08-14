const mongoose = require('mongoose');
const { string, email } = require('zod');

const SignInSchema = mongoose.Schema({
    name:string,
    email:email,
    password:string
})

module.exports = mongoose.model('signin',SignInSchema);