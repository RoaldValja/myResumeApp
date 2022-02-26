const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/resumeAppDB',
{ useNewUrlParser: true, useUnifiedTopology: true});
/*
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true});

    */
require('./user');
require('./backendSkill');
require('./frontendSkill');
require('./programmingSkill');
require('./school');
require('./softSkill');
require('./versionControlSkill');
require('./personalInfo');