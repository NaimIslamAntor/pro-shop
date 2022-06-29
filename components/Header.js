import { useState, useEffect } from "react";
import { MenuAlt3Icon } from "@heroicons/react/outline";
import Link from 'next/link'


import { useContext } from "react"
import { AuthenticationContext } from '../config/authContext'

import Cart from './Cart'





const Header = () => {

  const [menuShow, setMenuShow] = useState(false);

  const [cartShow, setCartShow] = useState(false);

  const {auth, setAuth, cart} = useContext(AuthenticationContext)

 

  //sets the condition of menu onClick
  const showMenu = () => {
    setMenuShow(!menuShow);
  };


  //for logging out the user
  const logout = () => {
    localStorage.removeItem('authInfo')
    setAuth(null);
  };


  //for showing and hiding the cart

  const hideShowCart = () => {
    setCartShow(!cartShow)
  }

  const totalCartItems = () => {
    return cart.reduce((total, item) => {
      return total + parseInt(item.qty)
    }, 0)
  }


  return (
    <>
    <header className="w-full md:h-24 border shadow fixed top-0 z-40 bg-white" suppressHydrationWarning={false}>
      <div
        className="w-5/6 h-full flex flex-col md:flex-row relative
     md:justify-between items-start md:items-center mx-auto"
      >
        {/* logo */}

        <div className="text-blue-300 text-2xl py-2 md:py-0 cursor-pointer">
          <Link href="/">
            <a>ProShop</a>
          </Link>
        </div>

        {/* navbar */}
        <nav
          className={`py-2 md:py-0 flex-col ${
            menuShow ? "flex" : "hidden"
          } md:block`}
        >
        <Link href="/">
          <a className="px-4 py-2 uppercase hover:bg-blue-100 rounded transition" >
            Home
          </a>
          </Link>
          <a
            href="#"
            className="px-4 py-2 uppercase hover:bg-blue-100 rounded transition"
          >
            About
          </a>
          <a
            href="#"
            className="px-4 py-2 uppercase hover:bg-blue-100 rounded transition"
          >
            Product
          </a>
         
          {
     
           !auth ? <> <Link href="/auth/register">
            <a  className="px-4 py-2 uppercase hover:bg-blue-100 rounded transition">
            Register
          </a>
            </Link>

            <Link href="/auth/login">
            <a  className="px-4 py-2 uppercase hover:bg-blue-100 
            rounded cursor-pointer transition">
            Login
          </a>
            </Link>
            </> : <a  className="px-4 py-2 uppercase hover:bg-blue-100 rounded transition cursor-pointer" onClick={logout}>
            Logout
          </a> 
            
          }

          {
            auth && <Link href='/myorders'>
            <a  className="px-4 py-2 uppercase hover:bg-blue-100 
            rounded cursor-pointer transition">
            My Orders
          </a>
            </Link>
          }
             
            
          {
     
     auth ? auth.role === 'admin' ? <Link href="/admin/product">
      <a  className="px-4 py-2 uppercase hover:bg-blue-100 rounded transition">
      Admin
    </a>
      </Link> : ''

       : ''
      
    }

    <a  className="px-4 py-2 uppercase hover:bg-blue-100 rounded transition cursor-pointer" onClick={hideShowCart}>
            Cart <sub>{totalCartItems()}</sub>
          </a> 
       
         
           
        </nav>
        <MenuAlt3Icon
          className="w-10 absolute right-0 top-2 md:hidden"
          onClick={showMenu}
        />
      </div>
    </header>

    <Cart
      cartShow={cartShow}
      hideShowCart={hideShowCart}
    />
    </>
  );
};

export default Header;
