import { useContext, useEffect, useState } from "react"
import { AuthenticationContext } from '../config/authContext'
import { useRouter } from 'next/router'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const checkout = () => {


  const router = useRouter()
  const {auth, setAuth, cart} = useContext(AuthenticationContext)


 const [address1, setAddress1] =  useState('')
 const [address2, setAddress2] =  useState('')

 const [phoneNumber, setPhoneNumber] =  useState('')
 const [zipCode, setZipcode] =  useState('')


 const onCashDelivery = 'cash-on-delivery'
 const bkash = 'bkash'

 //if not authenticated
  useEffect(()=>{
    
    if (!localStorage.getItem('authInfo')) {
      router.push('/auth/login')
    }

  }, [auth])


  // set those values if exists
  useEffect(()=>{

    setAddress1(auth?.address1 || '')
    setAddress2(auth?.address2 || '')
    setPhoneNumber(auth?.phoneNumber || '')
    setZipcode(auth?.zipCode || '')
    
    return () => {
      setAddress1('')
      setAddress2('')
      setPhoneNumber('')
      setZipcode('')
    }

  }, [auth])



  //for saving user info
  const saveUserInfo = async () => {

    const creds = {
      address1,
      address2,
      phoneNumber,
      zipCode,
    }

    const config = {
      headers: {
         "Authorization": `Bearer ${auth.token}`,
      }
    }



    try {
      const request = await axios.put('/api/auth/authinfo', creds, config)
      const response = request.data

      const existingUser = JSON.parse(localStorage.getItem('authInfo'))

      const user = {
        ...existingUser,
        ...response,
      }

      localStorage.setItem('authInfo', JSON.stringify(user))

      setAuth(user)


      toast.success('Info saved successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  

    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

      console.log(error.response);
    }
  }

  //for adding order
  const addOrder = async (type) => {

    if (type === 'cash-on-delivery') {
      requestForOrder()
      
      return
    }
  }

  //calculate total price
  const totalPrice = () => {
    return cart.reduce((total, price) => {
      const sum = total + parseInt(price.productPrice) * parseInt(price.qty)
       return sum
    },0)
  }



  return (
    <div className='pt-14 md:pt-24'>


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

{
  cart.length > 0 ? 
    <h1 className="text-center text-3xl mt-2">Total Price: <strong>{totalPrice()}</strong> BDT</h1>
   : 
   <h1 className="text-center text-3xl mt-2 text-red-500">Your cart is empty rigth now</h1>
}
    
   {/* form starts here */}
   <div className="w-5/6 mx-auto py-4 mt-4">


  {/* addess1 and address 2 container */}
   <div className="flex flex-col md:flex-row justify-between items-center py-2">

      <div className="w-full md:w-1/2 py-2 md:py-0 px-2">
      <label htmlFor="addessOne">Address 1</label><br/>
      <input type="text" id="addessOne" placeholder="District, Thana, union etc"
       className="border w-full h-8 rounded outline-none p-2 mt-2" onChange={e => setAddress1(e.target.value)} value={address1} />
      </div>

      <div className="w-full md:w-1/2 py-2 md:py-0 px-2">
      <label htmlFor="addressTwo">Address 2(optional)</label><br />
     <input type="text" id="addressTwo" placeholder="Road number etc"  
        className="border w-full h-8 rounded outline-none p-2 mt-2" onChange={e => setAddress2(e.target.value)} value={address2}/>
      </div>
     
   </div>


  {/* phoneNumber container */}
   <div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="zipCode">Phone number</label><br/>
<input type="number" id="zipCode" placeholder="Your Phone Number" 
 className="border w-full h-8 rounded outline-none p-2 mt-2" onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber}/>
</div>
 
</div>


 {/* zipcode container */}
 <div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="zipCode">Zip code/Post code</label><br/>
<input type="number" id="zipCode" placeholder="Your Zip Code" 
 className="border w-full h-8 rounded outline-none p-2 mt-2" onChange={e => setZipcode(e.target.value)} value={zipCode}/>
</div>
 
 <button className="btn-primary mt-4" onClick={saveUserInfo}>Save info</button>

</div>


<button className="btn-primary mt-4" disabled={cart.length > 0 ? false : true} onClick={() => addOrder(onCashDelivery)}>Cash on delivery</button>
<button className="btn-primary mt-4 ml-4" disabled={cart.length > 0 ? false : true} onClick={() => addOrder(bkash)}>Pay with Bkash</button>


   </div>
   </div>
  )
}

export default checkout










