const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const versionControlSkillSchema = new mongoose.Schema({
    skillName: String
});

module.exports = mongoose.model('versionControlSkill', versionControlSkillSchema);