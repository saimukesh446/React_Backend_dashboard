import React from 'react'


const NavBar = ({show,showRegisterHandler,logoutHandler, showlogOut}) => {
  
  const firmname = localStorage.getItem('firmname')
  
  return (
    <div className='navSection'>
        <div className='company'>
            vendor Dashboard
        </div>
        <div className="firmname">
          <h4> {firmname &&
           <div>
            firmname:{firmname}
           </div>
          }
            
          </h4>
        </div>

        <div className='userAuth'>
          {!showlogOut ? <><span onClick={show}>Login / </span>
          <span onClick={showRegisterHandler}>Register</span></>  : <span onClick={logoutHandler}>Logout</span> }


                       
        </div>
    </div>
  )
}

export default NavBar