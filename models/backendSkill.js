const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const backendSkillSchema = new mongoose.Schema({
    skillName: String
});

module.exports = mongoose.model('backendSkill', backendSkillSchema);