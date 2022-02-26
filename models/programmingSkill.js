const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programmingSkillSchema = new mongoose.Schema({
    skillName: String
});

module.exports = mongoose.model('programmingSkill', programmingSkillSchema);