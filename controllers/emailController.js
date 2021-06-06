const mailer = require('../src/utils/mailer')
let sendMail = async (req, res) => {
    try {
      // Lấy data truyền lên từ form phía client
      //const { to, subject, body } = req.body
      // Thực hiện gửi email
      await mailer.sendMail(req.body.to, req.body.subject, req.body.text)
      // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
      res.send('<h3>Your email has been sent successfully.</h3>')
    } catch (error) {
      // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
      console.log(error)
      res.send(error)
    }
  }
  module.exports = {
    sendMail: sendMail
  }