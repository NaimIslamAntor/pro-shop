import connectDB from '../../middlewares/connectDB'
import Product from '../../models/Product'


 async function handler(req, res) {

    const products = await Product.find()
    res.status(200).json({ products })
}
  

export default connectDB(handler)