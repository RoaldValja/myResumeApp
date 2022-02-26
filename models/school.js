const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new mongoose.Schema({
    schoolName: String,
    schoolGraduationDate: String
});

module.exports = mongoose.model('School', schoolSchema);