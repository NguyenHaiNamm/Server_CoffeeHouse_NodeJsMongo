var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
// var session = require('express-session')
var cors = require('cors')
var md5 = require('md5');
var jwt = require('jsonwebtoken');
router.use(cors());
const getuser = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCayCanh");
        dbo.collection("User").find().toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
} 

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // 'Beaer [token]'
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        //console.log(err, data);
        if (err) res.sendStatus(403);
        next();
    });
}

const login = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCayCanh");
        dbo.collection("User").findOne({ gmail: req.body.username, matkhau: md5(req.body.password) }, function (err, result) {
            if (err) {
                res.sendStatus(405);
            }
            else {
                if (result != null) {
                    const accessToken = jwt.sign({ username: req.body.username, password: md5(req.body.password) }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '30s',
                    });
                    res.send({ accessToken: accessToken });
                }
                else {
                    res.status(404).send({ ThongBao: "Bạn nhập sai tài khoản hoặc mật khẩu rồi" });
                }
            }
            db.close();
        });
    });
}
router.post('/login', login);
router.get('/getuser', getuser);
module.exports = router;