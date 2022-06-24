import connectDB from '../../../middlewares/connectDB'
import User from '../../../models/User'
import jwt from 'jsonwebtoken'

async function handler(req, res) {
    if(req.method !== "POST"){
        return res.status(400).send('Method not allowed!')
    }

    const {fname, lname, email, password, confirmPassword} = req.body

    if(!fname || !lname || !email || !password || !confirmPassword){
        return res.status(422).json({message: 'Please fill creds perfectly'})
    }

    if (password.length < 6) {
        return res.status(400).json({message: 'Password must be at least 6 character long'})
    }

    if(password !== confirmPassword){
        return res.status(422).json({message: 'Password and confirm password not matched!'})
    }


    const getUser = await User.findOne({email})

    if (getUser) {
        return res.status(401).json({message: 'User exists try a different email'})
    }


    //create user
    const user = await User.create({
        fname,
        lname,
        email,
        password,
    })

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


    res.status(201).json(tokenPayload)
  }


export default connectDB(handler)