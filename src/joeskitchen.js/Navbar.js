import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase/firebase'

export default function Navbar({setCartOpen,CartDetails}) {

  const logout=()=>{
    signOut(auth)
  }

  const cartCount=()=>{
    return CartDetails.reduce((prev,curr)=> prev + parseInt(curr.QTY),0)
  }

  return (
    <div className="navbar">
    <div className="navbar-banner">
      Joe's Kitchen
    </div>

    <div className="nav-cart" onClick={()=>setCartOpen(true)} >
      <i className="fa fa-shopping-cart" > </i>
      <div className="cart-items">{cartCount()}</div>
    </div>
    <div> <div className='logOutBtn' onClick={logout}>Log out <i class="fa fa-sign-out" aria-hidden="true"></i></div></div>
    
  </div>
  )
}
