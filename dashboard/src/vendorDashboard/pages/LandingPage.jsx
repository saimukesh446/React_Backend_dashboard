import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import { useState } from "react";
import Welcome from "../components/forms/Welcome";
import AllProducts from "../components/AllProducts";

const LandingPage = () => {

  const [showLogin,setShowLogin]=useState(false)
  const [showRegister,setShowRegister]=useState(false)
  const [showFirm,setShowFirm]=useState(false);
  const [showProduct,setShowProduct]=useState(false)
  const [welcome,setWelcome] = useState(false)
  const [products,setProducts] = useState(false)
  const [showLogout,setShowLogout] =useState(false)
  const [showFirmTitle,setShowFirmTitle]=useState(true)

  

  useEffect(()=>{
    const loginToken= localStorage.getItem('loginToken')
    
    if(loginToken){
      setShowLogout(true)
    }
  },[])

  useEffect(()=>{
    const firmname= localStorage.getItem("firmname")
    if(firmname){
      setShowFirmTitle(false)
    }
  },[])



  const logoutHandler =()=>{
    confirm("Are you sure you want to logout?")
     localStorage.removeItem("loginToken")
    localStorage.removeItem("firmId")
    localStorage.removeItem("firmname")
    setShowFirmTitle(true)
    setShowLogout(false)
  }

  const showLoginHandler =()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setWelcome(false)
    setProducts(false)
  }

  const showRegisterHandler =()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowProduct(false)
    setShowFirm(false)
    setWelcome(false)
    setProducts(false)
  }

  const showFirmHandler = ()=>{
    if(showLogout){
      setShowFirm(true)
    setShowRegister(false)
    setShowLogin(false)
    setShowProduct(false)
    setWelcome(false)
    setProducts(false)

    }
    else{
      alert("please login")
      setShowLogin(true)
    }
    
  }

  const showProductHandler =()=>{
    if(showLogout){
      setShowProduct(true)
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(false)
    setWelcome(false)
    setProducts(false)
    }
    else{
      alert("please login")
      setShowLogin(true)
    }
    
  }

  const showWelcomeHandler = ()=>{
    setWelcome(true)
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setProducts(false)

  }
  const showProductsHandler = ()=>{
    if(showLogout){
      setProducts(true)
    setWelcome(false)
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    }
    else{
      alert("please login")
      setShowLogin(true)
    }
    
  }
  
  return (
    <>
      <section className="landingsection">
        <NavBar show={showLoginHandler} showRegisterHandler={showRegisterHandler} logoutHandler={logoutHandler} showlogOut={showLogout} />
        <div  className="collectionSection">
          <SideBar firm ={showFirmHandler} product={showProductHandler} products={showProductsHandler} showFirmTitle={showFirmTitle}/>
          {showLogin && <Login wel={showWelcomeHandler} />}
          {showRegister && <Register/>}
          {showFirm && showLogout && <AddFirm/>}
          {showProduct&& showLogout && <AddProduct/>}
          {welcome && <Welcome/>}
          {products && showLogout && <AllProducts/>}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
