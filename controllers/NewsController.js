var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/test";
const getnews = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("NewsCoffee").find().toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}

const getnewsdetail = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var item = { _id: req.params.id };
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("NewsCoffee").find(item).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}


const getnewslimit = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("NewsCoffee").find().limit(2).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}


const deleteNews = (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var myquery = { _id: req.params.id };
        dbo.collection("NewsCoffee").deleteOne(myquery, function (err, obj) {
            if (err) res.sendStatus(405);
            res.send({ success: "Xóa dữ liệu thành công !" })
            db.close();
        });
    });
} 
const addNews = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        let dulieuthem = { _id: Math.random().toString(),date : Date.now(), titleNews : req.body.titleNews,ImageNews : req.body.ImageNews,Content : req.body.Content  };
        dbo.collection("NewsCoffee").insertOne(dulieuthem, (err, result) => {
            if (err) res.sendStatus(405);
            res.send({ success: "Thêm dữ liệu thành công !" })
            db.close();
        });
    });
}

const updateNews = (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
        if (err) res.sendStatus(403);
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: req.params.id };
        var newvalues = { $set: { date : Date.now(), titleNews : req.body.titleNews,ImageNews : req.body.ImageNews,Content : req.body.Content  } };
        dbo.collection("NewsCoffee").updateOne(item, newvalues, function (err, result) {
            if (err) res.sendStatus(405);
            res.send('Cập nhật thành công');
            db.close();
        });
    });
}
 
module.exports = {
    getnews:  getnews,
    getnewslimit: getnewslimit,
    addNews : addNews,
    getnewsdetail : getnewsdetail,
    deleteNews : deleteNews,
    updateNews : updateNews
}