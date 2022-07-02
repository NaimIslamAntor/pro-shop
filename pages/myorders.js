import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import OrderCard from "../components/OrderCard"
import { AuthenticationContext } from '../config/authContext'
import { useRouter } from 'next/router'



const Myorders = () => {

    const router = useRouter()
    const {auth} = useContext(AuthenticationContext)

    const [orders, setOrders] = useState([])

    //if not authenticated
  useEffect(()=>{
    
    if (!localStorage.getItem('authInfo')) {
      router.push('/auth/login')
    }

  }, [auth])


     useEffect(() => {

        const fetchOrders = async () => {
            
            const config = {
                headers: {
                   "Authorization": `Bearer ${auth.token}`,
                }
              }

              try {
                
              const request = await axios.get(`/api/order`, config)
              const orderss = request.data
              console.log(orderss)
              setOrders(orderss)
              } catch (error) {
                console.log(error)
              }
              
        }

        if (auth) {
            fetchOrders()
        }

      }, [auth])
    


  return (
    <div className="pt-14 md:pt-24">
    
    <div className="w-5/6 mx-auto">
    {
        orders.map(order => <OrderCard order={order} key={order._id} />)
    }
        
    </div>
    
    </div>
  )
}





export default Myorders