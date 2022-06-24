import connectDB from '../../../middlewares/connectDB'
import User from '../../../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


async function handler(req, res) {
    if(req.method !== "POST"){
        return res.status(400).send('Method not allowed!')
    }

    const { email, password,} = req.body

    if(!email || !password){
        return res.status(422).json({message: 'Please fill creds perfectly'})
    }


    const user = await User.findOne({email})


    if (!user) {
        return res.status(404).json({message: 'User not found'})
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(401).json({message: 'Password not matched'})
    }

  
    const tokenPayload = {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        password: user.password,
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '180d' })

    delete tokenPayload.password
    tokenPayload.token = token


    res.json(tokenPayload)
  }


export default connectDB(handler)