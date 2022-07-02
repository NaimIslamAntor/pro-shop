import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState, useContext } from 'react'
import { AuthenticationContext } from '../../config/authContext'


import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Image from 'next/image'

const Slug = ({product}) => {


    const router = useRouter()
    const { slug } = router.query

    const [qty, setQty] = useState(1)

  const {cart, setCart} = useContext(AuthenticationContext)



    const { productName, productImage, productPrice, _id:id, productDescription } = product

    //show success message after cart added

    const cartAdded = () => {

      toast.success('Successfully added to the cart', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })

    }

    //added to the cart
    const addToCart = () => {

      if (qty < 1) {

        toast.error('You must add quantity of 1 item at least', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })

          return false
      }


      let carts = JSON.parse(localStorage.getItem('cart'))
      const cartItem = {productName, productImage, productPrice, id, qty}




      //if cart not found
      if (!carts) {

        const setUpCart = JSON.stringify([cartItem])
        localStorage.setItem('cart', setUpCart)

        cartAdded()
        resetCartState()
        return true
      }


      //if cart found
      const getCurrentItem = carts.find(cart => cart.id === id)

      if (getCurrentItem) {

        carts = carts.map(cart => {

          //if item already exists
            if (cart.id === id) {
              const parseQty = parseInt(cart.qty)
    
              cart.qty = parseQty + parseInt(qty)
    
            }
            return cart
        })

      }else{
        carts.push(cartItem)
      }


      localStorage.setItem('cart', JSON.stringify(carts))
      cartAdded()
      resetCartState()

    }


    function resetCartState(){
      setCart(JSON.parse(localStorage.getItem('cart')) || [])
    }
    


  return (
    <div className="pt-14 md:pt-24">


<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

    <Head>
        <title>ProShop || {slug}</title>
    </Head>


    <div className="w-5/6 mx-auto">

   
    <Image
          src={productImage}
          alt={productName}
          width={800}
          height={500}
      />

      <h2 className='text-3xl my-3'>{productName}</h2>
      <h2 className='text-2xl my-3'>Price: <strong>{productPrice}</strong> TAKA</h2>

      <p className="my-3">
        {productDescription}
      </p>


      {/* quantity container */}
<div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="quantity">Enter quantity</label><br/>
<input type="number" id="quantity" value={qty} onChange={e => setQty(e.target.value)}
className="border w-full h-8 rounded outline-none p-2 mt-2"  />
</div>


</div>

<button className="btn-primary" onClick={addToCart}>Add to cart</button>

    </div>
   
    </div>
  )
}

export default Slug



export async function getServerSideProps(context) {

    const { slug } = context.params

    let product
    try {

        const request = await axios.get(`${process.env.DOMAIN_NAME}/api/product/${slug}`)
        product = request.data.product

    } catch (error) {
        if (error) {
        return {
          notFound: true,
        }
  }

    }


    return {
      props: {product}, // will be passed to the page component as props
    }
  }