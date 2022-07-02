import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import { AuthenticationContext } from '../../config/authContext'
import { useRouter } from 'next/router'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Login = () => {
  const router = useRouter()
  const {auth, setAuth} = useContext(AuthenticationContext)


 const [email, setEmail] =  useState('')
 const [password, setPassword] =  useState('')

  useEffect(()=>{
    
    if (auth) {
      router.push('/')
    }

  }, [auth, setAuth, router])


  const attemptLogin = async () => {
    const creds = {
      email,
      password,
    }
 
    try {
      const request = await axios.post('/api/auth/login', creds)

      const {data} = request
      localStorage.setItem('authInfo', JSON.stringify(data))
      setAuth(data)


    } catch (error) {
       console.log(error.response.data)

       toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  
    }

  }


 

    return (
      <div className="pt-14 md:pt-24">
      <Head>
        <title>ProShop || Login</title>
      </Head>
      
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
   {/* form starts here */}
   <div className="w-5/6 mx-auto py-4 mt-4" method="POST" action="/api/auth/callback/credentials">


{/* email container */}
<div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="email">Email Address</label><br/>
<input type="email" id="email" placeholder="Your Email Address"
className="border w-full h-8 rounded outline-none p-2 mt-2" onChange={e => setEmail(e.target.value)} />
</div>


</div>

{/* email container */}
<div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="password">Password</label><br/>
<input type="password" id="password" placeholder="Your Password" onChange={e => setPassword(e.target.value)}
className="border w-full h-8 rounded outline-none p-2 mt-2" />
</div>


</div>






<button className="btn-primary mt-4" onClick={attemptLogin}>Login</button>


</div>

      </div>
    )
  }
  
  export default Login