var express = require('express');
var router = express.Router();
const ProductController = require('../controllers/ProductController');
const TypeProducts = require('../controllers/TypeProducts');
const NewsController = require('../controllers/NewsController');
const OrderProductsController = require('../controllers/OrderProductsController');
const BookingTableOnlineController = require('../controllers/BookingTableOnlineController');
const UploadImagesController = require('../controllers/UploadImagesController');
const OtherController = require('../controllers/OtherController');
const UserController = require('../controllers/UserController');
 const middlewareAuthenToken = require('../middleware/middlewareAuthenToken')
var cors = require('cors')
router.use(cors());
var fs = require('fs');
var request = require('request')
let path = require("path");
const nodemailer = require("nodemailer");
const multer = require('multer')
const jwt = require('jsonwebtoken');
// const { authenToken } = require('../middleware/middlewareAuthenToken');


var getIP = function (req, res) {
  ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr) {
    var list = ipAddr.split(",")[list.length - 1];
    ipAddr = list;
  } else {
    ipAddr = req.connection.remoteAddress;
  }
  res.json(ipAddr);
}

// const authenToken = (req, res, next) => {
//   const authorizationHeader = req.headers['authorization'];
//   // 'Beaer [token]'
//   if (!!authorizationHeader){
//     const token = authorizationHeader.split(' ')[1];
  
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
//       if (err){
//         res.send({message: "thất bại", error: err})
//       }
//       else{
//         console.log(data)
//         next();
//       }
      
//     });
//   }
//   else{
//     res.status(500).end();
//   }
// }

router.get('/images/:name', UploadImagesController.pathImages);

const imageUploader = multer({ dest: 'images/' })


router.post('/uploadImages', imageUploader.single('images'), UploadImagesController.UploadImages)

router.get('/getalldata', async(req, res)=>{
  console.log("token ok")
  const data = await ProductController.getdata();
  // console.log(data)

  res.send(data)
});
router.get('/getcoffee/:id', ProductController.getcoffee);
router.post('/addCoffee', ProductController.addCoffee);
router.delete('/xoa/:id', ProductController.xoa);
router.put('/update_coffee/:id', ProductController.update_coffee);
router.get('/getdata/page=:page', ProductController.getdatapage);
router.get('/getpage', ProductController.getpage);
router.get('/findToCoffee', ProductController.findToCoffee);

router.get('/getloai', TypeProducts.getloaicoffee);
router.get('/getloai/:id', TypeProducts.getloaicoffee_id);
router.put('/updateloai/:id', TypeProducts.updateloai);
router.post('/addloaicoffee', TypeProducts.addloaicoffee);
router.delete('/xoaloai/:id', TypeProducts.xoaloai);
router.get('/getcoffee_idloai/:id', TypeProducts.getcoffee_idloai);

router.post('/orderProduct', OrderProductsController.orderProducts);
router.get('/getorderProduct', OrderProductsController.getorderProducts);
router.get('/getorderProducts_iD/:id', OrderProductsController.getorderProducts_iD);
router.delete('/deleteorderProducts_iD/:id', OrderProductsController.deleteorderProducts_iD);
router.put('/updatestatusorderProducts_iD/:id', OrderProductsController.updatestatusorderProducts_iD);
router.get('/getDataOrderProductPage/page=:page', OrderProductsController.getDataOrderProductPage);
router.get('/getPageOrderProducts', OrderProductsController.getPageOrderProducts);

router.post('/BookingTableOnline', BookingTableOnlineController.BookingTableOnline);
router.get('/GetBookingTableOnline', BookingTableOnlineController.GetBookingTableOnline);
router.put('/cancelBookingTableOnline/:id', BookingTableOnlineController.cancelBookingTableOnline)
router.put('/updateBookingTableOnline/:id', BookingTableOnlineController.updateBookingTableOnline);
router.delete('/deleteBookingTableOnline/:id', BookingTableOnlineController.deleteBookingTableOnline);
router.get('/getPageBookingTableOnline', BookingTableOnlineController.getPageBookingTableOnline);
router.get('/getDataBookingTableOnlinePage', BookingTableOnlineController.getDataBookingTableOnlinePage);

router.get('/getNews', NewsController.getnews);
router.get('/getNews/:id', NewsController.getnewsdetail);
router.delete('/deleteNews/:id', NewsController.deleteNews);
router.put('/updateNews/:id', NewsController.updateNews);
router.get('/getNewslimit', NewsController.getnewslimit);
// router.get('/', NewsController.);

router.get('/OpenShop', OtherController.OpenShop);
router.get('/WeAreShopCoffee', OtherController.WeAreShopCoffee);
router.get('/ImagesShop', OtherController.ImagesShop);
router.get('/ContentGioiThieuShop', OtherController.ContentGioiThieuShop);
router.put('/UpdateContentGioiThieuShop', OtherController.UpdateGioiThieuShop);
router.put('/UpdateImagesShop', OtherController.UpdateImagesShop);

router.get('/getUser', UserController.getUser);
router.delete('/deleteUser/:id', UserController.deleteUser);
router.put('/updateUser', UserController.updateUser);

router.get('/getIP', getIP);


module.exports = router;
