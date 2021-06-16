var express = require('express');
var router = express.Router();

// var session = require('express-session')
const mailer = require('../src/utils/mailer')
const LoginController = require('../controllers/LoginController')
var cors = require('cors')

const middlewareAuthenToken = require('../middleware/middlewareAuthenToken')
router.use(cors());


router.post('/logout',LoginController.logout );
router.post('/refreshToken',LoginController.refreshToken );

router.post('/dangky', LoginController.dangky);
router.post('/login', LoginController.login);
router.post('/loginAdmin', LoginController.loginAdmin);
router.get('/getuser', LoginController.getuser);
router.get('/getProfile',   LoginController.getProfile);

module.exports = router;