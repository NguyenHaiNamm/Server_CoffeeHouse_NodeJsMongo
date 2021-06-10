var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/test";
const getdata = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("SanPham").find().toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}

const getdatainpage = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("SanPham").find().limit(10).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
} 
const xoa = (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var myquery = { _id: req.params.id };
        dbo.collection("SanPham").deleteOne(myquery, function (err, obj) {
            if (err) res.sendStatus(405);
            res.send({ success: "Xóa dữ liệu thành công !" })
            db.close();
        });
    });
}

const add = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        let dulieuthem = { _id: req.body._id, TenCoffee: req.body.ten, mota: req.body.mota, images: [req.body.img], gia: req.body.gia, _idloai: req.body._idloai, soluong: req.body.soluong, thongtin: req.body.thongtin, thuonghieu: req.body.thuonghieu };
        dbo.collection("SanPham").insertOne(dulieuthem, (err, result) => {
            if (err) res.sendStatus(405);
            res.send({ success: "Thêm dữ liệu thành công !" })
            db.close();
        });
    });
}


const update_coffee = (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
        if (err) res.sendStatus(403);
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: req.params.id };
        var newvalues = { $set: { name: req.body.name, img: req.body.img, Gia: req.body.Gia, _idLoai: req.body._idLoai } };
        dbo.collection("SanPham").updateOne(item, newvalues, function (err, result) {
            if (err) res.sendStatus(405);
            res.send('Cập nhật thành công');
            db.close();
        });
    });
}


const getcoffee = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var item = { _id: req.params.id };
        dbo.collection("SanPham").find(item).toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result[0]);
            db.close();
        });
    });
}
module.exports = {
    getdata: getdata,
    getcoffee: getcoffee,
    update_coffee: update_coffee,
    add: add,
    xoa: xoa,
}