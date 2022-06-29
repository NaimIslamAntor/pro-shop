import connectDB from "../../middlewares/connectDB";
import protectUser from "../../middlewares/protectUser";
import User from '../../models/User'
import Order from '../../models/Order'


import calculatePrice from '../../config/calculatePrice'


async function handler(req, res) {
    
    switch (req.method) {
        case 'POST':

          const { products, paymentType, bkashNumber, trxId } = req.body
          const { email } = req.user

          const onCashDelivery = 'cash-on-delivery'
          const bkash = 'bkash'

//           const onCashDelivery = 'cash-on-delivery'
//  const bkash = 'bkash'


            // if (paymentType !== onCashDelivery || paymentType !== bkash) {
            //     return res.status(422).json({message: 'Payment method not allowed'})
            // }


            //validation if payment method is bkash
            if (paymentType === bkash) {
                
                if (!bkashNumber || !trxId) {
                    return res.status(422).json({message: `Bkash number and transaction
                     id are required in bkash checkout`})
                }

                if (!Number.isInteger(parseInt(bkashNumber))) {
                    return res.status(422).json({message: 'Bkash number must be numeric'})
                }


                if (bkashNumber.length < 11) {
                    return res.status(422).json({message: 'Bkash number must be atleast 11 digit long'})
                }
            
            
                if (bkashNumber.length > 14) {
                    return res.status(422).json({message: 'Bkash number must not be more than 14 digit long'})
                }

                
            }

             try {

                const user = await User.findOne({email})


                if (!user.address1 || !user.phoneNumber || !user.zipcode) {
                    return res.status(403).json({message: 'Please fill required additional info'})
                }
    
    
                if (!Array.isArray(products)) {
                    return res.status(422).json({message: `Data type is not valid`})
                }
    
                if (products.length < 1) {
                    return res.status(422).json({message: `Please add some products to
                     your cart to place and order`})
                }
    
              const totalPrice = await calculatePrice(products)
    
                
               const order = await Order.create({
                userId: user._id,
                products,
                paymentType,
                totalPrice,
               })
    
               //if payment type is bkash
               if (paymentType === bkash) {
                order.bkashNumber = bkashNumber
                order.trxId = trxId
                await order.save()
               }
    
               res.status(201).json(order)

             } catch (error) {
                console.log(error)
                res.status(500).json({message: error.message})
             }

            break;


            case 'GET':
                const userEmail = req.user.email

                try {

                    const user = await User.findOne({email: userEmail})

                    const getOrders = await Order.find({userId:user._id}).sort('-createdAt')

                    res.json(getOrders)

                } catch (error) {
                    res.status(500).json({message: error.message})
                }

                break;
    
        default:
            res.status(405).json({message: 'Method not allowed'})
            break;
    }
  }
  

  export default protectUser(connectDB(handler))