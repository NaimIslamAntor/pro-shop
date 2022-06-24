import mongoose from 'mongoose'


const Schema = mongoose.Schema

const order = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },

  products: {
    type: Array,
    required: true,
  },
  paymentStatus:{
      type: String,
      default: 'unpaid'
  },


  paymentType:{
    type: String,
    required: true
},

  totalPrice:{
    type: String,
    required: true,
},

deliversIn:{
  type: String,
  default: Date.now + 7,
},

},
{
    timestamps: true,
});


mongoose.models = {};

const Order = mongoose.model('orders', order);

export default Order


