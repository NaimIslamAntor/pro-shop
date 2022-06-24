import { useContext } from 'react'
import CartItem from './CartItem'
import { AuthenticationContext } from '../config/authContext'
import Link from 'next/link'


const Cart = ({ cartShow, hideShowCart }) => {



  
  const {auth, cart, setCart} = useContext(AuthenticationContext)



  function resetCartState(){
    setCart(JSON.parse(localStorage.getItem('cart')) || [])
  }
  
  //removes an= item from cart
  function removeItemCart (id){

    if (!confirm('Are you sure to remove the product from cart')) {
      return false
    }

    const getCart = JSON.parse(localStorage.getItem('cart'))

    const editedCart = getCart.filter(cart => cart.id !== id)

    localStorage.setItem('cart', JSON.stringify(editedCart))

    resetCartState()


  }



    //removes an item from cart
    function editItemCart (id, qty){

      const getCart = JSON.parse(localStorage.getItem('cart'))

      const editedCart = getCart.map(cart => {
        if (cart.id === id) {
          cart.qty = qty
        }

        return cart
      })

      localStorage.setItem('cart', JSON.stringify(editedCart))
      resetCartState()

    }



  return (
    <div className={`w-1/2 lg:w-1/4 fixed ${cartShow ? 'right-0' : 'right-[-100%]'} 
    bottom-0 top-0 z-50 bg-white transition overflow-y-scroll`}>
   <button onClick={hideShowCart} className="btn-primary">Close</button>

        {/* Cart item container */}
       <div className="mt-3 pl-2">
            
            {
              cart.map(item =>   <CartItem  key={item.id} 
              id={item.id}
              productName={item.productName} 
              productImage={item.productImage}
              qty={item.qty}
              removeItemCart={removeItemCart}
              editItemCart={editItemCart}
               />)
            }
       
        
    </div>
    {
      cart.length > 0 ? <center><Link href={auth ? '/checkout' : '/auth/login'}>
        <a className="btn-primary">Check out</a>
      </Link></center> : <h1 className='text-center'>Cart is empty now!</h1>
    }
    </div>
  )
}

export default Cart