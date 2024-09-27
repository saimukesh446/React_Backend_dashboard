import React from 'react'

const SideBar = ({firm,product,products,showFirmTitle}) => {
  return (
    <div className='sideBarSection'>
        <ul>
           {showFirmTitle ? <li onClick={firm}>Add Firm</li> :"" } 
            <li onClick={product}>Add products</li>
            <li onClick={products}>All products</li>
            <li>User Details</li>
        </ul>
        </div>
  )
}

export default SideBar