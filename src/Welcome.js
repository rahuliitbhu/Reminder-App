import React, { useEffect } from 'react'

import { Link } from 'react-router-dom';
import './Welcome.css'




import firebase from './firebase.js'
function Welcome() {

  let userId;
  useEffect(()=>{
    
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          userId=user.uid
        //  setId(userId)
        }})
        
  },[])

  return (
    <div>

     { !userId?<nav>
    <ul>
      <li><Link to="/viewreminder">View Reminder</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Signup</Link></li>
    </ul>
  </nav>:<nav>
    <ul>
      <li><Link to="/viewreminder">View Reminder</Link></li>

      <li><Link to="/logout">Logout</Link></li>
    </ul>
  </nav>
  
  
     }
     </div>
  )
}

export default Welcome