var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/test";
const emailController = require('../controllers/emailController')
const ProductController = require('../controllers/ProductController');
const TypeProducts =require('../controllers/TypeProducts');
const NewsController =require('../controllers/NewsController');
const OrderProductsController = require('../controllers/OrderProductsController');
const BookingTableOnlineController = require('../controllers/BookingTableOnlineController');
const mailer = require('../src/utils/mailer')
var cors = require('cors')
var multer = require('multer')
router.use(cors());
var request = require('request')
let path = require("path");
const nodemailer = require("nodemailer");

// Khởi tạo biến cấu hình cho việc lưu trữ file upload ahihi hvhg
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



router.get('/', ProductController.getdata);
router.get('/getcoffee/:id',  ProductController.getcoffee);
router.post('/add', ProductController.add);
router.delete('/xoa/:id', ProductController.xoa);
router.put('/update_coffee/:id', ProductController.update_coffee);

router.get('/getloai', TypeProducts.getloaicoffee);
router.get('/getloai/:id', TypeProducts.getloaicoffee_id);
router.delete('/xoaloai/:id', TypeProducts.xoaloai);

router.get('/getNCC', getNCC);

router.post('/orderProduct', OrderProductsController.orderProducts);
router.get('/getorderProduct', OrderProductsController.getorderProducts);
router.get('/getorderProducts_iD/:id', OrderProductsController.getorderProducts_iD);
router.delete('/deleteorderProducts_iD/:id', OrderProductsController.deleteorderProducts_iD);
router.put('/updatestatusorderProducts_iD/:id', OrderProductsController.updatestatusorderProducts_iD);
//router.post('/send-email', emailController.sendMail)

router.post('/BookingTableOnline', BookingTableOnlineController.BookingTableOnline);

router.get('/getNews', NewsController.getnews);
router.get('/getNews/:id', NewsController.getnewsdetail);
router.delete('/deleteNews/:id',NewsController.deleteNews);
router.put('/updateNews/:id', NewsController.updateNews);
router.get('/getNewslimit', NewsController.getnewslimit);
router.post('/addNews', NewsController.addNews);


async function SendMail(abc) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
   
    const adminEmail = 'phamjin303@gmail.com'
    const adminPassword = '0352343938'
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: adminEmail, // generated ethereal user
        pass: adminPassword, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" '+  adminEmail , // sender address
      to: abc, // list of receivers
      subject: "Hello Test✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
module.exports = router;
