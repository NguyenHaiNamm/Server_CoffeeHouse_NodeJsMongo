var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/test";

var cors = require('cors')
var multer = require('multer')
router.use(cors());
var request = require('request')
let path = require("path");


// Khởi tạo biến cấu hình cho việc lưu trữ file upload
let diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Định nghĩa nơi file upload sẽ được lưu lại
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
    // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
    let math = ["image/png", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
    let filename = `${Date.now()}-phamjin-${file.originalname}`;
    callback(null, filename);
  }
});
// Khởi tạo middleware uploadFile với cấu hình như ở trên,
// Bên trong hàm .single() truyền vào name của thẻ input, ở đây là "file"
let uploadFile = multer({storage: diskStorage}).single("req.body.img");
// Route này Xử lý khi client thực hiện hành động upload file
router.post("/upload", (req, res) => {
  // Thực hiện upload file, truyền vào 2 biến req và res
  uploadFile(req, res, (error) => {
    // Nếu có lỗi thì trả về lỗi cho client.
    // Ví dụ như upload một file không phải file ảnh theo như cấu hình của mình bên trên
    if (error) {
      return res.send(`Error when trying to upload: ${error}`);
    }
    // Không có lỗi thì lại render cái file ảnh về cho client.
    // Đồng thời file đã được lưu vào thư mục uploads
    res.sendFile(path.join(`${__dirname}/uploads/${req.file.filename}`));
  });
});


// Sản Phẩm
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
    
        let dulieuthem = { _id: req.body._id, TenCoffee: req.body.ten, mota: req.body.mota, images: [req.body.img], gia:  req.body.gia, _idloai:req.body._idloai , soluong : req.body.soluong, thongtin : req.body.thongtin, thuonghieu :  req.body.thuonghieu};
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


const getitemcoffee = (req, res, next) => {
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
// het REST Sản phẩm


const chitietdata_ = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("CTNCC").find().toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}

const chitietdata = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCayCanh");
        dbo.collection("ShopCayCanh").find().toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}


//Loại Sản Phẩm 
const getloaicoffee = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("LoaiSanPham").find().toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}

const xoaloai = (req, res, next) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        var myquery = { _id: req.params.id };
        dbo.collection("LoaiSanPham").deleteOne(myquery, function (err, obj) {
            if (err) res.sendStatus(405);
            res.send({ success: "Xóa dữ liệu thành công !" })
            db.close();
        });
    });
}



//Nhà cung cấp
const getNCC = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("NhaCungCap").find().toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}


const getDonHang = (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("DbCoffeeHouse");
        dbo.collection("Order").find().toArray(function (err, result) {
            if (err) res.sendStatus(405);
            res.send(result);
            db.close();
        });
    });
}


router.get('/', getdata);
router.get('/getcoffee/:id',  getitemcoffee);
router.post('/add', add);
router.delete('/xoa/:id', xoa);
router.put('/update_coffee/:id', update_coffee);



router.get('/getloai', getloaicoffee);
router.delete('/xoaloai/:id', xoaloai);

router.get('/getNCC', getNCC);


router.get('/getDonHang', getDonHang);


router.get('/chitietdata_', chitietdata_);
router.get('/chitietdata', chitietdata);


module.exports = router;
