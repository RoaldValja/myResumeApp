const passport = require('passport');
const User = require('../models/user');
const School = require('../models/school');
const ProgrammingSkill = require('../models/programmingSkill');
const BackendSkill = require('../models/backendSkill');
const FrontendSkill = require('../models/frontendSkill');
const VersionControlSkill = require('../models/versionControlSkill');
const SoftSkill = require('../models/softSkill');
const PersonalInfo = require('../models/personalInfo');

exports.getHomePage = (req, res) => {
    School.find((error, schools) => {
        if(!error){
            console.log(schools);
            ProgrammingSkill.find((error2, programmingSkills) => {
                if(!error2){
                    console.log(programmingSkills);
                    BackendSkill.find((error3, backendSkills) => {
                        if(!error3){
                            console.log(backendSkills);
                            FrontendSkill.find((error4, frontendSkills) => {
                                if(!error4){
                                    console.log(frontendSkills);
                                    VersionControlSkill.find((error5, versionControlSkills) => {
                                        if(!error5){
                                            console.log(versionControlSkills);
                                            SoftSkill.find((error6, softSkills) => {
                                                if(!error6){
                                                    console.log(softSkills);
                                                    PersonalInfo.find((error7, personalInformation) => {
                                                        if(!error7){
                                                            console.log("personal info:");
                                                            console.log(personalInformation);
                                                            res.render('index', {loggedIn: req.isAuthenticated(), schoolList: schools, 
                                                                programmingSkillsList: programmingSkills, backendSkillsList: backendSkills,
                                                                frontendSkillsList: frontendSkills, versionControlSkillsList: versionControlSkills,
                                                                softSkillsList: softSkills, personalInfo: personalInformation});
                                                        } else {
                                                            console.log(error7);
                                                        }
                                                    });
                                                } else {
                                                    console.log(error6);
                                                }
                                            });
                                        } else {
                                            console.log(error5);
                                        }
                                    });
                                } else {
                                    console.log(error4);
                                }
                            });
                        } else {
                            console.log(error3);
                        }
                    });
                    
                } else {
                    console.log(error2);
                }
            });
        } else {
            console.log(error);
        }
    });
}

exports.getRegisterPage = (req, res) => {
    res.render('register', {loggedIn: req.isAuthenticated()});
}

exports.postRegisterUser = (req, res) => {
    User.register({username: req.body.username}, req.body.password, (error, user) => {
        if(error) {
            console.log(error);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/')
            });
        }
    });
}

exports.getLoginPage = (req, res) => {
    res.render('login', {loggedIn: req.isAuthenticated()});
}

exports.postLoginUser = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (error) => {
        if(error) {
            console.log(error);
            res.redirect('/login');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/');
            });
        }
    });
}

exports.getAdminPage = (req, res) => {
    if(req.isAuthenticated()){
        School.find((error, schools) => {
            if(!error){
                console.log(schools);
                ProgrammingSkill.find((error2, programmingSkills) => {
                    if(!error2){
                        console.log(programmingSkills);
                        BackendSkill.find((error3, backendSkills) => {
                            if(!error3){
                                console.log(backendSkills);
                                FrontendSkill.find((error4, frontendSkills) => {
                                    if(!error4){
                                        console.log(frontendSkills);
                                        VersionControlSkill.find((error5, versionControlSkills) => {
                                            if(!error5){
                                                console.log(versionControlSkills);
                                                SoftSkill.find((error6, softSkills) => {
                                                    if(!error6){
                                                        console.log(softSkills);
                                                        PersonalInfo.find((error7, personalInformation) => {
                                                            if(!error7){
                                                                console.log("personal info:");
                                                                console.log(personalInformation);
                                                                res.render('admin', {loggedIn: req.isAuthenticated(), schoolList: schools, 
                                                                    programmingSkillsList: programmingSkills, backendSkillsList: backendSkills,
                                                                    frontendSkillsList: frontendSkills, versionControlSkillsList: versionControlSkills,
                                                                    softSkillsList: softSkills, personalInfo: personalInformation});
                                                            } else {
                                                                console.log(error7);
                                                            }
                                                        });
                                                    } else {
                                                        console.log(error6);
                                                    }
                                                });
                                            } else {
                                                console.log(error5);
                                            }
                                        });
                                    } else {
                                        console.log(error4);
                                    }
                                });
                            } else {
                                console.log(error3);
                            }
                        });
                        
                    } else {
                        console.log(error2);
                    }
                });
            } else {
                console.log(error);
            }
        });
        
    } else {
        res.redirect('/login');
    }
}

exports.getLogoutUser = (req, res) => {
    req.logout();
    res.redirect('/login');
}


exports.postNewSchool = (req, res) => {
    const userSchoolName = req.body.newSchoolName;
    const userSchoolGraduationDate = req.body.newSchoolGraduationDate;
    let newSchool = new School();
    newSchool.schoolName = userSchoolName;
    newSchool.schoolGraduationDate = userSchoolGraduationDate;

    newSchool.save((error, response) => {
        if(!error){
            console.log(response);
            res.redirect('/admin');
        } else {
            console.log(error);
        }
    });
}


exports.postEditSchool = (req, res) => {
    const updateOrDelete = req.body.schoolCheckbox;
    const schoolId = req.body.schoolId;
    const schoolName = req.body.schoolName;
    const schoolGraduationDate = req.body.schoolGraduationDate;
    if(updateOrDelete == "update"){
        School.findByIdAndUpdate(schoolId, {schoolName, schoolGraduationDate}, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to update");
            }
        });
    } else {
        School.findByIdAndRemove(schoolId, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to delete.");
            }
        });
    }
}

exports.postNewProgrammingSkill = (req, res) => {
    const userSkillName = req.body.newProgrammingSkillName;
    let newSkill = new ProgrammingSkill();
    newSkill.skillName = userSkillName;

    newSkill.save((error, response) => {
        if(!error){
            console.log(response);
            res.redirect('/admin');
        } else {
            console.log(error);
        }
    });
}

exports.postEditProgrammingSkill = (req, res) => {
    const updateOrDelete = req.body.programmingSkillCheckbox;
    const skillId = req.body.programmingSkillId;
    const skillName = req.body.programmingSkillName;
    if(updateOrDelete == "update"){
        ProgrammingSkill.findByIdAndUpdate(skillId, {skillName}, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to update");
            }
        });
    } else {
        ProgrammingSkill.findByIdAndRemove(skillId, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to delete.");
            }
        });
    }
}


exports.postNewBackendSkill = (req, res) => {
    const userSkillName = req.body.newBackendSkillName;
    let newSkill = new BackendSkill();
    newSkill.skillName = userSkillName;

    newSkill.save((error, response) => {
        if(!error){
            console.log(response);
            res.redirect('/admin');
        } else {
            console.log(error);
        }
    });
}

exports.postEditBackendSkill = (req, res) => {
    const updateOrDelete = req.body.backendSkillCheckbox;
    const skillId = req.body.backendSkillId;
    const skillName = req.body.backendSkillName;
    if(updateOrDelete == "update"){
        BackendSkill.findByIdAndUpdate(skillId, {skillName}, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to update");
            }
        });
    } else {
        BackendSkill.findByIdAndRemove(skillId, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to delete.");
            }
        });
    }
}

exports.postNewFrontendSkill = (req, res) => {
    const userSkillName = req.body.newFrontendSkillName;
    let newSkill = new FrontendSkill();
    newSkill.skillName = userSkillName;

    newSkill.save((error, response) => {
        if(!error){
            console.log(response);
            res.redirect('/admin');
        } else {
            console.log(error);
        }
    });
}

exports.postEditFrontendSkill = (req, res) => {
    const updateOrDelete = req.body.frontendSkillCheckbox;
    const skillId = req.body.frontendSkillId;
    const skillName = req.body.frontendSkillName;
    if(updateOrDelete == "update"){
        FrontendSkill.findByIdAndUpdate(skillId, {skillName}, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to update");
            }
        });
    } else {
        FrontendSkill.findByIdAndRemove(skillId, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to delete.");
            }
        });
    }
}

exports.postNewVersionControlSkill = (req, res) => {
    const userSkillName = req.body.newVersionControlSkillName;
    let newSkill = new VersionControlSkill();
    newSkill.skillName = userSkillName;

    newSkill.save((error, response) => {
        if(!error){
            console.log(response);
            res.redirect('/admin');
        } else {
            console.log(error);
        }
    });
}

exports.postEditVersionControlSkill = (req, res) => {
    const updateOrDelete = req.body.versionControlSkillCheckbox;
    const skillId = req.body.versionControlSkillId;
    const skillName = req.body.versionControlSkillName;
    if(updateOrDelete == "update"){
        VersionControlSkill.findByIdAndUpdate(skillId, {skillName}, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to update");
            }
        });
    } else {
        VersionControlSkill.findByIdAndRemove(skillId, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to delete.");
            }
        });
    }
}

exports.postNewSoftSkill = (req, res) => {
    const userSkillName = req.body.newSoftSkillName;
    let newSkill = new SoftSkill();
    newSkill.skillName = userSkillName;

    newSkill.save((error, response) => {
        if(!error){
            console.log(response);
            res.redirect('/admin');
        } else {
            console.log(error);
        }
    });
}

exports.postEditSoftSkill = (req, res) => {
    const updateOrDelete = req.body.softSkillCheckbox;
    const skillId = req.body.softSkillId;
    const skillName = req.body.softSkillName;
    if(updateOrDelete == "update"){
        SoftSkill.findByIdAndUpdate(skillId, {skillName}, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to update");
            }
        });
    } else {
        SoftSkill.findByIdAndRemove(skillId, (error) => {
            if(!error){
                res.redirect('/admin');
            } else {
                console.log("Failed to delete.");
            }
        });
    }
}

exports.postUpdatePersonalDetails = (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const dateOfBirth = req.body.dateOfBirth;
    const country = req.body.country;
    const city = req.body.city;

    const profilePicture = req.file.filename;

    let personalInfo = new PersonalInfo();
    personalInfo.firstname = firstname;
    personalInfo.lastname = lastname;
    personalInfo.dateOfBirth = dateOfBirth;
    personalInfo.country = country;
    personalInfo.city = city;
    personalInfo.profilePicture = profilePicture;

    
    personalInfo.save((error, response) => {
        if(!error){
            console.log(response);
            res.redirect('/admin');
        } else {
            console.log(error);
        }
    });
}