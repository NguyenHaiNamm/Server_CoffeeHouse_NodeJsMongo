var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/test";
// var session = require('express-session')
var cors = require('cors')
var md5 = require('md5');
var jwt = require('jsonwebtoken');
router.use(cors());
const getuser = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
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
router.post('/refreshToken', (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        console.log(err, data);
        if (err) res.sendStatus(403);
        const accessToken = jwt.sign(
            { username: data.username },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '30s',
            }
        );
        res.json({ accessToken });
    });
});
var refreshTokens = [];
const login = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("User").findOne({ username: req.body.username, password: req.body.password }, function (err, result) {
            if (err) {
                res.sendStatus(405);
            }
            else {
                if (result != null) {
                    const accessToken = jwt.sign({ username: req.body.username, password: req.body.password }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '30s',
                    });

                    const refreshToken = jwt.sign({ username: req.body.username, password: req.body.password }, process.env.REFRESH_TOKEN_SECRET);
                    refreshTokens.push(refreshToken);
                    res.json({ accessToken, refreshToken });
                }
                else {
                    res.status(404).send({ ThongBao: "Bạn nhập sai tài khoản hoặc mật khẩu rồi" });
                }
                //res.status(200).send('ok')
            }
            db.close();
        });
    });
}

router.post('/logout', (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
    res.sendStatus(200);
});

router.post('/login', login);
router.get('/getuser', getuser);
module.exports = router;