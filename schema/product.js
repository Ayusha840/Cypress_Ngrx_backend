const mongo = require('mongoose')

const productSchema = mongo.Schema({
    title: {
        type: String
      },
      description: {
        type: String
      },
      price: {
        type: Number
      },
      discountPercentage: {
        type: String
      },
      rating: {
        type: String
      },
      stock: {
        type: Number
      },
      brand: {
        type: String
      },
      category: {
        type: String
      },
      thumbnail: {
        type: String
      },
      images:{
        type:Array
      }
})

module.exports = mongo.model('product', productSchema)