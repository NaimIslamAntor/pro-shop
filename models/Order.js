import mongoose from 'mongoose'


const Schema = mongoose.Schema

const date = new Date()

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


bkashNumber:{
  type: String,
  default: null,
},

trxId:{
  type: String,
  default: null,
},


deliversIn:{
  type: String,
  default: date.setDate(date.getDate() + 7),
},

deliversStatus:{
  type: String,
  default: 'not delivered yet',
},


},
{
    timestamps: true,
});


mongoose.models = {};

const Order = mongoose.model('orders', order);

export default Order


