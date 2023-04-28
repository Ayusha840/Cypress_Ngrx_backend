const mailer = require('nodemailer')
var CryptoJS = require('crypto-js')
const key = 'mwnebrvtcyxuzioapsldkfjg'
let tranport = mailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'ash2405.rathore@gmail.com',
    pass: 'fhbojkahoxgxwmgv',
  },
})

module.exports = {
  async sendEmail(req, url, button) {
    let sendId = CryptoJS.AES.encrypt(JSON.stringify(req._id), key)
      .toString()
      .replace('+', 'xMl3Jk')
      .replace('/', 'Por21Ld')
      .replace('=', 'Ml32')
      .replace('+', 'xMl3Jk')
      .replace('/', 'Por21Ld')
      .replace('=', 'Ml32')
      .replace('+', 'xMl3Jk')
      .replace('/', 'Por21Ld')
      .replace('=', 'Ml32')
    let sendText
    let subject
    if (button === 'Verify Email') {
      sendText = `<table style="width:100vw"> 
     <tr colspan="2"><td><h3>Welcome to Food24X7</h3></td></tr><tr>
      <td>Name:</td><td>${req.name}</td> </tr>
       <tr><td>Role</td> <td>${req.role}</td> </tr>
       <tr><td>Business Name</td><td>${req.businessName}</td></tr>
       <tr colspan="2"><td><a href="http://localhost:4200/${url}/${sendId}" style="background-color: #4CAF50;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;">${button}</a></td></tr>
       </table>`
      subject = 'Welcome Message for email verify'
    }
    if (button === 'Reset Password') {
      sendText = `<table style="width:100vw"> 
    <tr colspan="2"><td><h3>Hi' ${req.name},</h3></td></tr><tr>
    <tr colspan="2"><td><h3>Please click below button for reset password.</h3></td></tr><tr>
      <tr colspan="2"><td><a href="http://localhost:4200/${url}/${sendId}" style="background-color: #4CAF50;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;">${button}</a></td></tr>
      </table>`
      subject = 'Email for Password Reset'
    }
    tranport.sendMail({
      from: 'ash2405.rathore@gmail.com',
      to: req.email,
      subject: subject,
      html: sendText,
    })
  },
}
