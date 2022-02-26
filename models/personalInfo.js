const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalInfoSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    dateOfBirth: String,
    country: String,
    city: String,
    profilePicture: String
});

module.exports = mongoose.model('personalInfo', personalInfoSchema);