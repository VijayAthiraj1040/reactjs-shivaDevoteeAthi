import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword, signInWithGoogle } from '../firebase/firebase';
import './Login.css'
import googleImg from '../google.png'


function Register({user,loading,setIsLoading}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigate=useNavigate()

    const register=()=>{
        registerWithEmailAndPassword(name,email,password)
    }

    useEffect(() => {
      if (loading) 
        return (setIsLoading(true))
      if (user) navigate('/products/Latest',{replace:true} )
      }
    , [loading])

  return (
    <div className='form'>
        <div className='form-container'>
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Full Name'/>
            <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='abcdefg@gmail.com'/>
            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/>
            <img className="google" src={googleImg} alt="google" onClick={signInWithGoogle}/>
            <button onClick={register}>Register Now</button>
            <div className='message'> Already have an Account? <Link to='/'>Login</Link> now</div>
            
        </div>


    </div>
  )
}

export default Register