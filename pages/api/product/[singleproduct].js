import connectDB from '../../../middlewares/connectDB'
import Product from '../../../models/Product'


 async function handler(req, res) {

    const { singleproduct } = req.query

    try {
        const product = await Product.findOne({productSlug: singleproduct})

        if (!product) {
            return res.status(404).json({message: 'Product not available'})
        }

        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}
  

export default connectDB(handler)