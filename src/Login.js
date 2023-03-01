import React, { useState,useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from './firebase.js'
const Login = () => {


    const [res,setRes] =useState(false)
   // const [userdata,setuserdata]=useState([])
   // const navigate=useNavigate()
  const [err,setError]=useState(false)

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
 /* 
useEffect( ()=>{
    const result=firebase.firestore().collection('Users').get().then((dataRef)=>{
        const data =  dataRef.docs.map((doc)=>doc.data())
        setuserdata(data)
         })
},[])*/

const handleRetry = () => {
    setEmail("");
    setPassword("");
    setError(false)
  };

  const handleSubmit=async (e)=>{
    e.preventDefault()
  //  console.log(username,password)
    try{
      
            const res = await firebase.auth().signInWithEmailAndPassword(email,password)
            localStorage.setItem('useremail',email)
            console.log(res.user.email)
           
        
       // console.log(result)
        
        
    } 
    catch(err)
    {
       // if(result)
      //  setRes(true)
        console.log(err)
       
        setError(err)
    }
  }


  return (
    
    
             
  <div>
   <h1><center> Login to Reminder application </center></h1>
  <form className='login-form' onSubmit={(e)=>handleSubmit(e)}>
  <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Username</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Type your email here" value={email}  onChange={(e)=>{setEmail(e.target.value)}}/>
</div>

  <div class="mb-3">
  <label for="exampleFormControlInput2" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleFormControlInput2" placeholder="Type your password here" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
</div>

<button type="submit" class="btn btn-primary">Login</button>
  </form>

  { 
  err?<center><h4 className="error">Login failed. Please try again.</h4></center>:<></>}
{  err?<center><button type="button" onClick={handleRetry}> Retry</button></center>:<></>
}



  </div>
      
  
  
  )
}

export default Login
