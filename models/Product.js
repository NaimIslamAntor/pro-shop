import mongoose from 'mongoose'


const Schema = mongoose.Schema

const product = new Schema({
  productName: {
    type: String,
    required: true
  },

  productSlug: {
    type: String,
    required: true,
    unique: true,
  },
  productPrice:{
      type: Number,
      required: true,
  },

  productPrice:{
    type: String,
    required: true,
},

productImage:{
  type: String,
  required: true,
},

productDescription:{
  type: String,
  required: true,
},

},
{
    timestamps: true,
});


mongoose.models = {};

const Product = mongoose.model('products', product);

export default Product