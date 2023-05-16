const userModel = require('./../schema').user
module.exports = {
  async userList(req, res) {
    console.log('--- user list calling ---')
    await userModel
      .find()
      .then((item) => {
        res.status(200).send(item)
      })
      .catch((err) => res.status(400).send(err))
  },
  //--------------------------
  async detail(req, res) {
    await userModel
      .findById(req.params.id)
      .then(async (item) => {
        if (item) {
          res.status(200).send(item)
        } else {
          res.status(404).send({ message: 'User not found!!!' })
        }
      })
      .catch((err) => res.status(400).send(err))
  },
  //--------------------------
  async createUser(req, res) {
    console.log('/----111111-----',req.body)
    await userModel
      .findOne({ email: req.body.email })
      .then(async (emailRes) => {
        if (emailRes) {
          res.status(400).send({ message: 'Email already exsist!!!' })
        } else {
          
          await userModel
          .create(req.body)
          .then((item) => {
              console.log('/----222222-----',req.body)
              res.status(200).send(item)
            })
            .catch((err) => res.status(400).send(err))
        }
      })
  },
  //--------------------------
  async updateUser(req, res) {
    console.log('/----updatea data-----',req.body)

    if (req.params.id) {
      await userModel.findById(req.params.id).then((idRes) => {
        // console.log(idRes)
        res.status(200).send({message:'User update successfully done!'})
      })         
      .catch((err) => res.status(400).send(err))

    }
  },
  //--------------------------
  async deleteUser(req,res){
    if(req.params.id){
      console.log('deldata',req.params.id)
      await userModel.findOne({_id:req.params.id}).then(async(idRes)=>{
        
        if(idRes){
        // await userModel.deleteOne({_id:req.params.id}).then((delRes)=>{
        //   if(delRes){
            res.status(200).send({message:'User delete successfully done!'})
        //   }
        // })
        // .catch((err) => res.status(400).send(err))
       }else{
        res.status(200).send({message:'User not found!'})
       }
        
      })
    }
  }
}
