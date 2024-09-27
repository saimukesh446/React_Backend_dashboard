import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = ({wel}) => {

  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");

  const loginHandler = async(e)=>{
    e.preventDefault();
    try{
        const response = await fetch(`${API_URL}/vendor/login`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({email,password})
        })
        const data = await response.json();
        console.log(data)
        if(response.ok){

            alert('Login success')
            setEmail("")
            setPassword("")
            localStorage.setItem('loginToken',data.token)
            wel()
        }
        const vendorId = data.vendorIds
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
        const vendorData = await vendorResponse.json();
        if(vendorResponse.ok){
          const vendorFirmId = vendorData.vendorFirmId
          const vendorFirmName = vendorData.vendor.firm[0].firstname
          localStorage.setItem('firmId',vendorFirmId)
          localStorage.setItem('firmname',vendorFirmName)
          window.location.reload()
          
        }
        
    }
    catch(error){
        console.error(error);

    }
  }

  return (
    <div className="loginSection">
      <form className="authform" onSubmit={loginHandler}>
        <h3>vendor login</h3>
        <label>Email</label>
        <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email" />
        <br />
        <label>password</label>
        <input type="text" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password" />
        <div className="btnSubmit">
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
