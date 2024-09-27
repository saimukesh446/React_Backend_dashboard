import React from "react";
import { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Register = () => {

  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(true)

  const handleSubmit =async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch(`${API_URL}/vendor/register`, {
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({username,email,password})
      })
      const data = await response.json();
      if(response.ok){
        console.log(data)
        setUsername("");
        setEmail("");
        setPassword("")
        alert("vendor resgistered successfull")
      }

    }
    catch(error){
      console.error("registeration failed")
      alert("Registeration failed")
    }

  }

  return (
    <div className="registerSection">
      <form className="authform" onSubmit={handleSubmit}>
        <h3>vendor Register</h3>
        <label>Username</label>
        <input type="text" name ="username" value={username} onChange={(e)=>setUsername(e.target.value)}  placeholder="enter your username"/>
        <label>Email</label>
        <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email" />  
        <label>password</label>
        <input type="text" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password" />
        <div className="btnSubmit">
          <button type='submit'>submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
