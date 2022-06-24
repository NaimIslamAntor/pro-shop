import {useState, useEffect} from 'react'
import Image from 'next/image'


const CartItem = ({ id, productName, productImage, qty, removeItemCart, editItemCart }) => {

  const [quantity, setQuantity] = useState(qty)

  useEffect(() => {
    setQuantity(qty)
  },[qty])


  const handleChange = e => {
    const itemQty = parseInt(e.target.value)

    if (itemQty > 0) {
      setQuantity(itemQty)
      return
    }

    alert('You must add quantity of 1 item at least')
  }

  
  return (
    <>
      {/* cart item */}
      <div className="py-4 border">

      <div className="flex items-center">
      <Image
         src={productImage}
         alt={productName}
         width={50}
         height={50}
       />
       <h1 className="pl-2 text-sm">{productName}</h1>
      </div>

      <div className="pl-2">
       

      <div className="py-2">

<div className="w-full py-2 md:py-0 px-2 pb-2">
<label htmlFor="qty">Quantity</label><br/>
<input type="number" id="qty" placeholder="Your Quantity" value={quantity} 
onChange={handleChange}
className="border w-full h-8 rounded outline-none p-2 mt-2" />
</div>

<button className="btn-primary mt-2" onClick={() => editItemCart(id, quantity)}>Edit</button>
<button className="btn-primary ml-2 mt-2" onClick={() => removeItemCart(id)}>Remove</button>





      </div>

   </div>

</div>
</>
  )
}

export default CartItem