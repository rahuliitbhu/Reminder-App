import React from 'react'
import { Link } from 'react-router-dom'

function Thank() {

  return (
    <div>
      <div>Thank You <br/> Your Transaction is confirmed</div>
    <Link to="/logout">
     <button className='btn-primary' >Logout</button>
    </Link>
    </div>
    
  )
}

export default Thank