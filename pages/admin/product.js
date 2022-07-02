import { useEffect, useContext } from "react"
import { AuthenticationContext } from '../../config/authContext'
import { useRouter } from 'next/router'

import AdminNav from "../../components/AdminNav"
import AdminProductForm from "../../components/AdminProductForm"

const Product = () => {


    const router = useRouter()
    const {auth, setAuth} = useContext(AuthenticationContext)


    useEffect(() => {

        console.log(auth)

        if (!localStorage.getItem('authInfo')) {
          router.push('/')
        }

       if (auth) {
          if (auth?.role !== 'admin') {
            router.push('/')
          }
        
       }

      

      }, [auth, router])


  return (
    <div className="pt-14 md:pt-24 flex flex-col md:flex-row justify-center gap-8">
      <AdminNav/>
      <AdminProductForm/>
    </div>
  )
}

export default Product