const productModel = require('./../schema').product
module.exports = {
  async addbulk(req, res) {
    console.log(req.body)
    for (const val of req.body) {
      await productModel.create(val).then((bulkRes) => {})
    }
    res.status(200).send({ messaeg: 'bulk data update!!!' })
  },
  async productList(req ,res){
    await productModel.find().then((list)=>{
        res.status(200).send(list)
    })
  }
}
