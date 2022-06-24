import '../styles/globals.css'
import Header from '../components/Header'
import { AuthContext } from '../config/authContext'



function MyApp({ Component, pageProps }) {

  return (<>
  <AuthContext>
  <Header/>
  <Component {...pageProps} />
  </AuthContext>
  </>)
    
}

export default MyApp


//https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430


// import { useState,useEffect } from 'react'
// import '../styles/globals.css'
// import Header from '../components/Header'
// import { ThemeContext, AuthContext, authInfo } from '../config/authContext'


// // import { SessionProvider } from "next-auth/react"
// // import axios from 'axios'

// function MyApp({ Component, pageProps }) {

//   const [auth, setAuth] = useState(authInfo)


//   useEffect(() => {

//     // const request = await axios.get('/api/auth/getuser')

//     setAuth(JSON.parse(localStorage.getItem('authInfo')))


//     if(auth){
//     console.log(auth.role)

//     }

//   },[auth, setAuth])

//   return (<>
//   {/* <SessionProvider session={session}> */}
//   <ThemeContext.Provider value={{auth, setAuth}}>
//   <Header/>
//   <Component {...pageProps} />
//   </ThemeContext.Provider>
//   {/* </SessionProvider> */}
//   </>)
    
// }

// export default MyApp
