import React, { useState, useEffect } from "react";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  auth,
} from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import googleImg from '../google.png'

function Login({ user, loading, setIsLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return;
    }
    if (user) {
      navigate("/products/Latest");
    }
  }, [user, loading]);

  return (
    <div className="form">
      <div className="form-container">
        <input
          type="text"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="login-btn" onClick={()=>signInWithEmailAndPassword(auth ,email, password)} >
          Login
        </button>
        <img className="google" src={googleImg} alt="google" onClick={signInWithGoogle}/>
        <div className="message">
          <Link to="/reset">Forgot Password</Link> <br/> <br/>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
