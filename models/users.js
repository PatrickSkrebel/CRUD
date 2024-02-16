const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required:  true
    },
    department:{
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    jobTitle: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
});
module.exports = mongoose.model('User', userSchema);