import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const Schema = mongoose.Schema

const user = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
      type: String,
      required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'customer',
  },

  address1: {
    type: String,
    default: null
  },

  address2: {
    type: String,
    default: null
  },

  phoneNumber: {
    type: String,
    default: null
  },

  zipcode: {
    type: String,
    default: null
  }

},
{
    timestamps: true,
});

//hash password before storing
user.pre('save', async function(){
  const sault = await bcrypt.genSalt(12)
  const hashPassword = await bcrypt.hash(this.password, sault)
  this.password = hashPassword
})

mongoose.models = {};

const User = mongoose.model('users', user);

export default User

 