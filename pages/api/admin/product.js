import connectDB from '../../../middlewares/connectDB'
import protect from '../../../middlewares/protect'
import Product from '../../../models/Product'


async function handler(req, res) {
    if(req.method !== "POST"){
        return res.status(400).send('Method not allowed!')
    }


    const {
        productName,
        productSlug,
        productPrice,
        productDescription,
        fileName,
      } = req.body

      if (!productName || !productSlug || !productPrice || !productDescription || !fileName) {
        return res.status(422).json({message: 'Please enter all fields'})
      }


    //   if (productPrice.) {
    //     return res.status(422).json({message: 'Please enter all fields'})
    //   }


   
    try {

        if (await Product.findOne({productSlug})) {
            return res.status(422).json({message: 'This slug is taken try something different'})
          }
    
    
        await Product.create({
            productName,
            productSlug,
            productPrice,
            productImage: fileName,
            productDescription,
        })

        res.status(201).json({message: 'Product created successfully'})


    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }

  }


export default protect(connectDB(handler))