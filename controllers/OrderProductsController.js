var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/test";
// Ddăt hang 
const orderProducts = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        let dulieuthem = {_id : Math.floor(Math.random() * 110000).toString(),fullname : req.body.fullname,phone : req.body.phone, note : req.body.note, gmail : req.body.gmail,address : req.body.address, OrderProducts: req.body.OrderProducts,status : 1, date :Date.now(), sumMoney : req.body.sumMoney};
        dbo.collection("OrderProducts").insertOne(dulieuthem, (err, result) => {
            if (err) res.sendStatus(405);
            // SendMail(req.body.gmail).catch(console.error);
            res.send({ success: "Thêm dữ liệu thành công !" })
            db.close();
        });
    });
}



const getorderProducts = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var mysort = { date: - 1 };
        dbo.collection("OrderProducts").find().sort(mysort).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}

const getorderProducts_iD = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: req.params.id };
        dbo.collection("OrderProducts").find(item).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}



const deleteorderProducts_iD = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: req.params.id };
        dbo.collection("OrderProducts").deleteOne(item, function (err, result) {
            if (err) res.sendStatus(405);
            res.send({ success: "Xóa dữ liệu thành công !" })
            db.close();
        });
    });
}
const updatestatusorderProducts_iD = (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
        if (err) res.sendStatus(403);
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: req.params.id };
        var newvalues = { $set: { status : req.body.status } };
        dbo.collection("OrderProducts").updateOne(item, newvalues, function (err, result) {
            if (err) res.sendStatus(405);
            res.send('Cập nhật status thành công');
            db.close();
        });
    });
}



const getPageOrderProducts = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("OrderProducts").find().toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send({pagelength : Math.ceil(result.length / 5), abc : abc});
            db.close();
        });
    });
}

const getDataOrderProductPage = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var page = parseInt(req.params.page);
        dbo.collection("OrderProducts").find().limit(5).skip(5*(page - 1)).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}

// const getMoney = (req, res, next) => {
//     MongoClient.connect(url, (err, db) => {
//         if (err) throw err;
//         var dbo = db.db("DbCoffeeHouse");
//         var page = parseInt(req.params.page);
//         dbo.collection("OrderProducts").find().toArray(function (err, result) {
//             if (err) res.sendStatus(405);
//             res.send(result);
//             db.close();
//         });
//     });
// } 

module.exports = {
    deleteorderProducts_iD: deleteorderProducts_iD,
    getorderProducts_iD : getorderProducts_iD,
    updatestatusorderProducts_iD : updatestatusorderProducts_iD,
    getorderProducts : getorderProducts,
    orderProducts: orderProducts,
    getDataOrderProductPage: getDataOrderProductPage,
    getPageOrderProducts : getPageOrderProducts
  
}