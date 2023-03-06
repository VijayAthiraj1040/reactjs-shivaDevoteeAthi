import Slider from './joeskitchen.js/Slider'
import Navbar from './joeskitchen.js/Navbar'
import MenuItem from './joeskitchen.js/MenuItem'
import Products from './joeskitchen.js/Products'
import { Route, Routes,useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cart from './joeskitchen.js/Cart'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './firebase/firebase'
import Login from './joeskitchen.js/Login'
import Register from './joeskitchen.js/Register'
import Reset from './joeskitchen.js/Reset'

export default function App() {
  const [products,setProducts]=useState([])
  const [isPending,setIsPending]=useState(true)
  const [CartOpen,setCartOpen]=useState(false);
  const [CartDetails,setCartDetails]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(()=>{
    if(loading){
      setIsLoading(true)
      return
    }
    if(user){
      setIsLoading(false)
      navigate('/products/Latest')
    } else{
      navigate('/')
    }
  },[user, loading])

  useEffect(()=>{
    response()
    },[])

const response = ()=>
   { 
   setTimeout(()=>{
     axios("https://www.app.tutorjoes.in/mobile/getAllFood")
      .then(res=>{
          setProducts(res.data.items);
          setIsPending(false);
         })
  },1000);}

  
  const handleFavourite = (ID) => {
    const newFavourites = products.map(e => {
      return e.ID === ID ? { ...e, fav: !e.fav } : e;
    });
    setProducts(newFavourites)
  }

  const CheckIsCart=(Item)=>{
    const IsCart=CartDetails.find((e)=> e.ID === Item.ID)
    return IsCart;
  }
  const AddtoCart=(Item)=>
        {
          const newCart=CheckIsCart(Item)
          if(!newCart){
          setCartDetails((prev)=>([...prev,{...Item , QTY:1 , UniqueTotalAMT : Item.AMT}]));
          }
          else{
            alert("already in a CART")
          }
        }

return (
    <div>
        {user&&<>
        <Navbar setCartOpen={setCartOpen} CartDetails={CartDetails} setCartDetails={setCartDetails}/>
        <Slider/>
        <MenuItem />
        </>}
        <Routes>
        {!user && <> 
                    <Route path='/' element={<Login user={user} loading={loading} setIsLoading={setIsLoading}/>}></Route> 
                    <Route path='/register' element={<Register user={user} loading={loading} setIsLoading={setIsLoading}/>}></Route> 
                    <Route path='/reset' element={<Reset user={user} loading={loading} setIsLoading={setIsLoading}/>} ></Route>
                  </>}
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/products/:id" element={<Products products={products} isPending={isPending} CheckIsCart={CheckIsCart} handleFavourite={handleFavourite} AddtoCart={AddtoCart} />}/>
        </Routes>
        {CartOpen &&  <Cart CartDetails={CartDetails} setCartDetails={setCartDetails}  setCartOpen={setCartOpen}/>}
        
          
</div>
  )
}
