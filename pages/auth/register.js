import Head from "next/head"
import { useState, useEffect } from "react"
import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext } from "react"
import { AuthenticationContext } from '../../config/authContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {


  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()

  const {auth, setAuth} = useContext(AuthenticationContext)


  useEffect(()=>{
    
    if (auth) {
      router.push('/')
    }

  }, [auth, setAuth])

 

  //req for registration

  const registerReq = async () => {

    const creds = {
      fname, lname,
      email,
      password, confirmPassword
    }

    try {
      const request = await axios.post('/api/auth/register', creds)

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
        <title>ProShop || Register</title>
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
   <div className="w-5/6 mx-auto py-4 mt-4">


  {/* fname lname container */}
   <div className="flex flex-col md:flex-row justify-between items-center py-2">

      <div className="w-full md:w-1/2 py-2 md:py-0 px-2">
      <label htmlFor="firstName">First Name</label><br/>
      <input type="text" id="firstName" placeholder="Your First Name" value={fname} onChange={e => setFname(e.target.value)}
       className="border w-full h-8 rounded outline-none p-2 mt-2" />
      </div>

      <div className="w-full md:w-1/2 py-2 md:py-0 px-2">
      <label htmlFor="lastName">Last Name</label><br />
     <input type="text" id="lastName" placeholder="Your Last Name"  value={lname} onChange={e => setLname(e.target.value)}
        className="border w-full h-8 rounded outline-none p-2 mt-2" />
      </div>
     
   </div>


  {/* email container */}
   <div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="email">Email Address</label><br/>
<input type="email" id="email" placeholder="Your Email Address" value={email} onChange={e => setEmail(e.target.value)}
 className="border w-full h-8 rounded outline-none p-2 mt-2" />
</div>
 

</div>



{/* password and confirm password container */}
<div className="flex flex-col md:flex-row justify-between items-center py-2">

<div className="w-full md:w-1/2 py-2 md:py-0 px-2">
<label htmlFor="password">Password</label><br/> 
<input type="password" id="password" placeholder="Your Password" value={password} onChange={e => setPassword(e.target.value)}
 className="border w-full h-8 rounded outline-none p-2 mt-2" />
</div>

<div cla ssName="w-full md:w-1/2 py-2 md:py-0 px-2">
<label htmlFor="confirmPassword">Confirm Password</label><br />
<input type="password" id="confirmPassword" placeholder="Confirm Your Password"  value={confirmPassword}
 onChange={e => setConfirmPassword(e.target.value)}
  className="border w-full h-8 rounded outline-none p-2 mt-2" />
</div>

</div>


<button className="btn-primary mt-4" onClick={registerReq}>Register</button>


   </div>
   </div>
  )
}

export default Register