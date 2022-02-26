const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const frontendSkillSchema = new mongoose.Schema({
    skillName: String
});

module.exports = mongoose.model('frontendSkill', frontendSkillSchema);