const authModel = require('./../schema').auth
// const nodemailer = require('./../middleware/send-email')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECREATE_KEY = '1234567890abcdefghijklmnopqrstuvwxyyz'
module.exports = {
  async getUser(req, res) {
    if (req.params.id) {
      await authModel
        .findById(req.params.id)
        .then((idRes) => {
          console.log('..........', idRes)
          if (idRes) {
            res.status(200).send(idRes)
          } else {
            res.status(400).send({ message: 'User not found!!!' })
          }
        })
        .catch((err) => res.status(400).send(err))
    }
  },
  async signUp(req, res) {
    if (req.body.email) {
      await authModel.findOne({ email: req.body.email }).then((emailRes) => {
        if (emailRes) {
          res.status(400).send({ message: 'Email already exsist!!!' })
        } else {
          bcrypt.hash(req.body.password.toString(), 10, async (err, pass) => {
            req.body.password = pass
            await authModel
              .create(req.body)
              .then((item) => {
                // nodemailer.sendEmail(item, 'verify-email', 'Verify Email')
                res.status(200).send(item)
              })
              .catch((err) => res.status(400).send(err))
          })
        }
      })
    }
  },
  async resetPassword(req, res) {
    if (req.body._id) {
      console.log(req.body._id);
    
          bcrypt.hash(req.body.password.toString(), 10, async (err, pass) => {
            req.body.password = pass
            await authModel
              .findOneAndUpdate(
                { _id: req.body._id },
                {
                  $set: {
                  
                    password: req.body.password,
                   
                  },
                })
              .then((item) => {
                res.status(200).send({message:'Password Reset done!!!',item})
              })
              .catch((err) => res.status(400).send(err))
          })
       
    }
  },
  async verifyEmail(req, res) {
    if (req.body._id) {
      await authModel
        .findOneAndUpdate(
          { _id: req.body._id },
          {
            $set: {
              businessName: req.body.businessName,
              email: req.body.email,
              image: req.body.image,
              name: req.body.name,
              password: req.body.password,
              role: req.body.role,
              status: 'active',
            },
          },
        )
        .then((updateRes) => {
          res.status(200).send({ message: 'Email verification done!!!' })
        })
    } else {
      res.status(400).send({ message: 'Invalid request!!!' })
    }
  },
  async login(req, res) {
    if (req.body.email && req.body.password) {
      await authModel
        .findOne({ email: req.body.email })
        .then(async (emailRes) => {
          if (emailRes) {
            await bcrypt
              .compare(req.body.password.toString(), emailRes.password)
              .then((passMatch) => {
                if (!passMatch) {
                  res.status(400).send({ message: 'Password not matched!!!' })
                } else {
                  if (emailRes.status === 'active') {
                    let token = jwt.sign(
                      {
                        name: emailRes.name,
                        email: emailRes.email,
                        password: emailRes.password,
                        type: emailRes.type,
                      },
                      SECREATE_KEY,
                      { expiresIn: '24h' },
                    )
                    res.status(200).send({
                      message: 'Login successfully done!!!',
                      res: emailRes,
                      token,
                    })
                  } else {
                    res
                      .status(400)
                      .send({ message: 'Please Vrify Email First!!!' })
                  }
                }
              })
          } else {
            res.status(400).send({ message: 'no email found!!!' })
          }
        })
    } else {
      res.status(400).send({ message: 'Both email and password required!!!' })
    }
  },
  async forgetPassword(req, res) {
    if (req.body.email) {
      await authModel
        .findOne({ email: req.body.email }, { name: 1, email: 1, _id: 1 })
        .then((emailRes) => {
          if (!emailRes) {
            res.status(400).send({ message: 'Email not found!!!' })
          } else {
            // nodemailer.sendEmail(emailRes, 'reset', 'Reset Password');
            res.status(200).send({message:"Mail sent done!!!"})
          }
        })
    }
  },
}
