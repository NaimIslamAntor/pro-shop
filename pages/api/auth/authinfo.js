import connectDB from '../../../middlewares/connectDB'

import protectUser from '../../../middlewares/protectUser'

import User from '../../../models/User'



async function handler(req, res) {
    if(req.method !== "PUT"){
        return res.status(400).send('Method not allowed!')
    }

    const { address1, address2, zipCode, phoneNumber} = req.body
    const { email } = req.user

    if(!address1 || !zipCode || !phoneNumber){
        return res.status(422).json({message: 'Please fill creds perfectly'})
    }


    if (!Number.isInteger(parseInt(zipCode))) {
        return res.status(422).json({message: 'Zipcode only numbers allowed'})
    }


    if (!Number.isInteger(parseInt(phoneNumber))) {
        return res.status(422).json({message: 'Phone number only numbers allowed'})
    }


    if (phoneNumber.length < 11) {
        return res.status(422).json({message: 'Phone number must be atleast 11 digit long'})
    }


    if (phoneNumber.length > 14) {
        return res.status(422).json({message: 'Phone number must not be more than 14 digit long'})
    }


    try {
        const user = await User.findOne({email})

        user.address1 = address1
        user.address2 = address2 ? address2 : null
        user.phoneNumber = phoneNumber
        user.zipcode = zipCode
        
        await user.save()
    
    
        const payload = { 
            address1,
            address2,
            phoneNumber,
            zipCode
        }
    
        res.json(payload)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
  }


export default protectUser(connectDB(handler))