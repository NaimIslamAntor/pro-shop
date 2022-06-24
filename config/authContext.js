import React, { useState,useEffect } from 'react'

let authInfo = null


export const AuthenticationContext = React.createContext(authInfo);

export const AuthContext = ({ children }) => {

    const [auth, setAuth] = useState(authInfo)
    const [cart, setCart] = useState([])


    useEffect(() => {

        setAuth(JSON.parse(localStorage.getItem('authInfo')))

        setCart(JSON.parse(localStorage.getItem('cart')) || [])
    
        // if(auth){
        // console.log(auth.role)
    
        // }
    
      },[])

   return(
    <AuthenticationContext.Provider value={{auth, setAuth, cart, setCart}}>
    {children}
</AuthenticationContext.Provider>
   )
}

