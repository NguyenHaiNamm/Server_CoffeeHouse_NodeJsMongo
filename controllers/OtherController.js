var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/test";
const OpenShop = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("ThongTinKhac").find({_id: "01"}).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}


const WeAreShopCoffee = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("ThongTinKhac").find({_id: "02"}).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}
const ImagesShop = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("ThongTinKhac").find({_id: "03"}).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}

const UpdateImagesShop = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var newvalues = { $set: { images : req.body.images} };
        dbo.collection("ThongTinKhac").updateOne({_id: "03"}, newvalues,function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}

const ContentGioiThieuShop = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("ThongTinKhac").find({_id: "04"}).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}

const UpdateGioiThieuShop= (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
        if (err) res.sendStatus(403);
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: '04' };
        var newvalues = { $set: { content : req.body.content} };
        dbo.collection("ThongTinKhac").updateOne(item, newvalues, function (err, result) {
            if (err) res.sendStatus(405);
            res.send('Cập nhật status thành công');
            db.close();
        });
    });
}

module.exports = {
    OpenShop:  OpenShop,
    WeAreShopCoffee :WeAreShopCoffee,
    ImagesShop :ImagesShop,
    ContentGioiThieuShop :ContentGioiThieuShop,
    UpdateGioiThieuShop : UpdateGioiThieuShop,
    UpdateImagesShop : UpdateImagesShop

}