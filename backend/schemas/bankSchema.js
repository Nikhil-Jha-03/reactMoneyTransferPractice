const mongoose = require('mongoose');
const { number } = require('zod');

const BankSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:number,
        require:true
    }
})
const Bank = mongoose.model('Bank', BankSchema);

module.exports = {
    Bank
}