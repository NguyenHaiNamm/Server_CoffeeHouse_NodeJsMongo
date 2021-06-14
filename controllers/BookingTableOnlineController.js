var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/test";
const BookingTableOnline = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        let dulieu = {_id : Math.floor(Math.random() * 110000).toString(),fullname : req.body.fullname,phone : req.body.phone, date : req.body.date, timeslot : req.body.timeslot, status : 0};
        dbo.collection("BookingTableOnline").insertOne(dulieu, (err, result) => {
            if (err) res.sendStatus(405);
            res.send({ success: "Thêm dữ liệu thành công !" })
            db.close();
        });
    });
}

const GetBookingTableOnline = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        let mysort ={date : -1, status : 1}
        dbo.collection("BookingTableOnline").find().sort(mysort).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}

const updateBookingTableOnline = (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
        if (err) res.sendStatus(403);
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: req.params.id };
        var newvalues = { $set: { status : 1, table : 'Bàn số ' + Math.floor(Math.random() * 10) + 1} };
        dbo.collection("BookingTableOnline").updateOne(item, newvalues, function (err, result) {
            if (err) res.sendStatus(405);
            res.send('Cập nhật status thành công');
            db.close();
        });
    });
}

const cancelBookingTableOnline = (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
        if (err) res.sendStatus(403);
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: req.params.id };
        var newvalues = { $set: { status : 2 }};
        dbo.collection("BookingTableOnline").updateOne(item, newvalues, function (err, result) {
            if (err) res.sendStatus(405);
            res.send('Cập nhật status thành công');
            db.close();
        });
    });
}

const deleteBookingTableOnline = (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
        if (err) res.sendStatus(403);
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: req.params.id };
        dbo.collection("BookingTableOnline").deleteOne(item,  function (err, result) {
            if (err) res.sendStatus(405);
            res.send('Xóa thành công');
            db.close();
        });
    });
}

const getPageBookingTableOnline = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("BookingTableOnline").find().toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send({pagelength : Math.ceil(result.length / 5)});
            db.close();
        });
    });
}

const getDataBookingTableOnlinePage = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var page = parseInt(req.params.page);
        dbo.collection("BookingTableOnline").find().limit(5).skip(5*(page - 1)).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
} 


module.exports = {
    BookingTableOnline: BookingTableOnline,
    GetBookingTableOnline: GetBookingTableOnline,
    updateBookingTableOnline : updateBookingTableOnline,
    deleteBookingTableOnline : deleteBookingTableOnline,
    cancelBookingTableOnline : cancelBookingTableOnline,
    getDataBookingTableOnlinePage: getDataBookingTableOnlinePage,
    getPageBookingTableOnline : getPageBookingTableOnline

  }