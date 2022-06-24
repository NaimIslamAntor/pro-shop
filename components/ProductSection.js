import Product from "./Product"

const ProductSection = ({ products }) => {
  return (
    <div className="py-16">
    <div className="grid gap-1 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-5/6 mx-auto">

{
  products.map(product => {
    return  <Product
      src={product.productImage}
      name={product.productName}
      slug={product.productSlug}
      price={product.productPrice}
    />

    
  })
}
   

    </div>
    </div>
  )
}

export default ProductSection