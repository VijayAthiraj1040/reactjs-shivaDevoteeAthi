import { sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

function Reset({loading,setIsLoading}) {
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (loading) return  setIsLoading(true)
  }, [ loading]);
  return (
    <div className="form">
      <div className="form-container">
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
        <button  onClick={() =>sendPasswordResetEmail(auth ,email) ?alert('Reset link sended your mail Verify!!!'):alert('Check Your Mail')}>   reset 
        </button>
        <div className='message'>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;