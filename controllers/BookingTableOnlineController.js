var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/test";
const BookingTableOnline = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        let dulieu = {_id : Math.floor(Math.random() * 110000).toString(),fullname : req.body.fullname,phone : req.body.phone, date : req.body.date, timeslot : req.body.timeslot, status : false};
        dbo.collection("BookingTableOnline").insertOne(dulieu, (err, result) => {
            if (err) res.sendStatus(405);
            res.send({ success: "Thêm dữ liệu thành công !" })
            db.close();
        });
    });
}
module.exports = {
    BookingTableOnline: BookingTableOnline
  }