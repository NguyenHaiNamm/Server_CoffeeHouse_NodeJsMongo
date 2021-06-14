var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/test";
const getUser = (req, res, next) => {
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
const deleteUser = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var myquery = { _id: req.params.id };
        dbo.collection("User").deleteOne(myquery, function (err, obj) {
            if (err) res.sendStatus(405);
            res.send({ success: "Xóa dữ liệu thành công !" })
            db.close();
        });
    });
}
const updateUser = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: req.params.id };
        var newvalues = { $set: { status: false } };
        dbo.collection("User").updateOne(item, newvalues, function (err, result) {
            if (err) res.sendStatus(405);
            res.send('Cập nhật thành công');
            db.close();
        });
    });
}




// function getCallerIP(request) {
//     var ip = request.headers['x-forwarded-for'] ||
//         request.connection.remoteAddress ||
//         request.socket.remoteAddress ||
//         request.connection.socket.remoteAddress;
//     ip = ip.split(',')[0];
//     ip = ip.split(':').slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
//     return ip;
// }

var getIP = function (req) {
    ipAddr = req.headers["x-forwarded-for"];
    if (ipAddr) {
        var list = ipAddr.split(",")[list.length - 1];
        ipAddr = list;
    } else {
        ipAddr = req.connection.remoteAddress;
    }
    return ipAddr;
}




module.exports = {
    deleteUser: deleteUser,
    getUser: getUser,
    updateUser: updateUser
}
