import Product from '../models/Product'

const calculatePrice = async (products) => {
    
let totalPrice = 100
                
for(let product of products){
    const findItInDb = await Product.findById(product.id)
        console.log(findItInDb)
        totalPrice = totalPrice + parseInt(findItInDb.productPrice) * parseInt(product.qty)
}

 return totalPrice

}

export default calculatePrice