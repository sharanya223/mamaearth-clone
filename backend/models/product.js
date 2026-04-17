const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: {type:String},
    quantity: {type : Number},
    price: {type : Number},
    category: {type :String},
    description: {type :String},
     image: { type: String },
     
  });

  const ProductModel = mongoose.model("Product", productSchema);

  module.exports = ProductModel;