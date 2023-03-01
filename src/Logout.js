import React, { useEffect, useState } from 'react'
import firebase from './firebase.js'
function Logout() {
    const [message,setmessage] =useState("")
    const logout=async()=>{
    
 
       await firebase.auth().signOut().then(()=>{
            setmessage("You have been logout")
       })
       
    }
    useEffect( ()=>{
      localStorage.removeItem("useremail")
        logout()
    },[])
  return (
    <div>
        <h1>{message}</h1>

        </div>
  )
}

export default Logout