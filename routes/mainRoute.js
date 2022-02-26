const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

const path = require('path');
const multer = require('multer');

let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, './public/img');
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })
});

router.get('/', mainController.getHomePage);
router.get('/register', mainController.getRegisterPage);
router.post('/register', mainController.postRegisterUser);
router.get('/admin', mainController.getAdminPage);
router.post('/updatePersonal', upload.single('userFile'), mainController.postUpdatePersonalDetails);
router.post('/editSchool', mainController.postEditSchool);
router.post('/newSchool', mainController.postNewSchool);
router.post('/newProgrammingSkill', mainController.postNewProgrammingSkill);
router.post('/editProgrammingSkill', mainController.postEditProgrammingSkill);
router.post('/newBackendSkill', mainController.postNewBackendSkill);
router.post('/editBackendSkill', mainController.postEditBackendSkill);
router.post('/newFrontendSkill', mainController.postNewFrontendSkill);
router.post('/editFrontendSkill', mainController.postEditFrontendSkill);
router.post('/newVersionControlSkill', mainController.postNewVersionControlSkill);
router.post('/editVersionControlSkill', mainController.postEditVersionControlSkill);
router.post('/newSoftSkill', mainController.postNewSoftSkill);
router.post('/editSoftSkill', mainController.postEditSoftSkill);
router.get('/login', mainController.getLoginPage);
router.post('/login', mainController.postLoginUser);
router.get('/logout', mainController.getLogoutUser);

module.exports = router;