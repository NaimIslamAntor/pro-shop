import connectDB from "../../middlewares/connectDB";
import protectUser from "../../middlewares/protectUser";
import User from '../../models/User'
import Order from '../../models/Order'


async function handler(req, res) {
    
    switch (req.Method) {
        case 'POST':

          const { products, paymentType } = req.body
          const { email } = req.user

          const onCashDelivery = 'cash-on-delivery'
          const bkash = 'bkash'

            if (paymentType !== onCashDelivery || paymentType !== bkash) {
                return res.status(422).json({message: 'Payment method not allowed'})
            }

            const user = await User.findOne({email})


            if (!user.address1 || !user.phoneNumber || !user.zipcode) {
                return res.status(403).json({message: 'Please fill required additional info'})
            }


            if (!isArray(products)) {
                return res.status(422).json({message: `Data type is not valid`})
            }

            if (products.length < 1) {
                return res.status(422).json({message: `Please add some products to
                 your cart to place and order`})
            }


            
            if (paymentType === onCashDelivery) {
                
            }

            break;
    
        default:
            res.status(405).json({message: 'Method not allowed'})
            break;
    }
  }
  

  export default protectUser(connectDB(handler))