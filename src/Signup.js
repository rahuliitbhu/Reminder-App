import React, { useState ,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'


import firebase from './firebase.js'

const Signup = () => {

  const [res,setRes] =useState(false)
  const disp=useRef(null)
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  
  const handleSubmit= async (e)=>{
    e.preventDefault()
    console.log(username,password,name,email)
    try{
        const result = await firebase.auth().createUserWithEmailAndPassword(email,password)
 
        await result.user.updateProfile({
            displayName: name,
          });

const id=result.user.multiFactor.user.uid;
        console.log(id)
        firebase.firestore().collection('Users').add({
            name:name,
            
            email:email
   
            })
            .then((data)=>{
              console.log(data)
          })
        if(result)       
        setRes(true)

    } 
    catch(err)
    {
        console.log(err)
    }
    
  }


  return (
    
    
             
  <div>
    <h1><center> Signup to Reminder application </center></h1>

  <form className='login-form' onSubmit={(e)=>handleSubmit(e)}>
  <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Your name</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Type your name here" value={name} onChange={(e)=>{setName(e.target.value)}}/>
</div>

  <div class="mb-3">
  <label for="exampleFormControlInput3" class="form-label">Email </label>
  <input type="email" class="form-control" id="exampleFormControlInput3" placeholder="Type your email here" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
</div>

  <div class="mb-3">
  <label for="exampleFormControlInput4" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleFormControlInput4" placeholder="Type your password here" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
</div>
{
    
     res?<h4 style={{background:"#6FCF97"}}>Congratulations!!! Account created.</h4>:<></>
}
<button disable={res} type="submit" class="btn btn-primary">Register</button>
  </form>





  </div>
      
  
  
  )
}

export default Signup