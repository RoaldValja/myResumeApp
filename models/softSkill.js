const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const softSkillSchema = new mongoose.Schema({
    skillName: String
});

module.exports = mongoose.model('softSkill', softSkillSchema);