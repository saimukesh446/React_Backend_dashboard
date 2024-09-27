import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div className='error'>
    <Link to="/" style={{fontSize:'1.5rem'}}>
    <p>go back</p>
    </Link>
    
        <h1>401</h1>
        <div>Page Not Found</div>
    </div>
    </>
    
  )
}

export default NotFound