import React, { useState,useEffect } from "react";

import firebase from './firebase.js'
import {Link, useParams} from 'react-router-dom'
import './DisableReminder.css'
function DisableReminderSection({uid}) {
  let {paramid}=useParams()
  let userId;
  const [id,setId] =useState("")
  const [selectedDate, setSelectedDate] = useState("");
  const [DateArray, setDateArray] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [SubjectArray, setSubjectArray] = useState([]);
  const [reminder,setReminder]=useState([]);
  const [selectedReminder, setSelectedReminder] = useState("");
  const [description, setDescription] = useState("");


  let array=[]

  const [data,setData]=useState([])
  useEffect( ()=>{
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        userId=user.uid
        setId(userId)
        
      }
    });
      const result=firebase.firestore().collection('Reminders').get().then((dataRef)=>{
        const data =  dataRef.docs.map((doc)=>{
        
          return (doc.data().user_id==userId)?  ([doc.id,doc.data()]):[]
        })
         
        let mydata=data.filter((item)=>{
          return (item.length!=0)})
         setData(mydata)
          
         console.log(mydata)
         
         handleIntialise(mydata)
           })

           
  },[])


  const handleIntialise=(data)=>{
    const res=  data.map((item)=>{
  
           if(paramid && item[0]==paramid)
           {
            
            
           setSelectedDate(item[1].date)
        
           setDescription(item[1].description)
           setSelectedSubject(item[1].subject)
           setSelectedReminder(item[1].description.substring(0, 30))
      
           }

      })
    //  console.log(paramid)
     
}

  const handleDisable= async(uid,id)=>{
    try{
      const res= await firebase.firestore().collection('Reminders').where("user_id","==",uid).get().then((doc)=>{
      doc.forEach((doc)=>
      {
        if(doc.id==id)
      
        { const res= firebase.firestore().collection('Reminders').doc(id).update({
            status:"inactive"
          })
        } 
      })
      
    }) 
       console.log(res)
        }  
    
    catch(err) {
      console.log(err)
    }
 
  
  }



  const handleSubjectChange = event => {
    event.preventDefault()
    setDescription("")
    setSelectedReminder("")
    setSelectedSubject("")
    console.log(DateArray)
    const newdata=DateArray.filter((reminder)=>{
      if(paramid)
      {
        return reminder[0]==paramid
        
      }
      else{
        return reminder[1].subject==event.target.value

      }
    
     })
    setSubjectArray(newdata)
    setSelectedSubject(event.target.value);
    console.log(newdata)
  };

  const handleReminderChange = event => {
    event.preventDefault()
    setDescription("")
    console.log(event)
    const newdata = SubjectArray.find(
      (reminder) =>
      {
       
        return reminder[1].description === event.target.value

      } 
    );
    setSelectedReminder(event.target.value);
    setReminder(newdata)
    setDescription(newdata[1].description);
   
    console.log(reminder)
  };


  const handleDateChange =(e)=>{
    e.preventDefault()
    setSelectedDate("")
    setDescription("")
    setSelectedReminder("")
    setSelectedSubject("")
     const newdata=data.filter((reminder)=>{
    //  console.log(reminder[0],paramid)
      if(paramid)
      {
        return reminder[0]==paramid
        
      }
      else{
        return reminder[1].date==e.target.value

      }
    
      
     })
    
     setSelectedDate(e.target.value)
     setDateArray(newdata)
     console.log(newdata)
  }

  return (
    <div className="disable-reminder-section">
            <h1>
            Disable Reminder
        </h1>
      <div className="select-date">
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onMouseOver={handleDateChange}
          onChange={handleDateChange}
        />
      </div>
      <div className="select-subject">
        <label htmlFor="subject">Select Subject:</label>
        <select id="subject" value={selectedSubject} onChange={handleSubjectChange} >
        <option value="" disabled>
            { !selectedSubject?<p>Select a subject</p> :selectedSubject  }  
          </option>
          {DateArray.map((subject) => (
            <option key={subject[0]} value={subject[1].subject}>
              {subject[1].subject}
            </option>
          ))}
        </select>
      </div>
      <div className="select-reminder">
        <label htmlFor="reminder">Reminders:</label>
        <select
          id="reminder"
          value={selectedReminder}
          onChange={handleReminderChange}
          
        >
           <option value="" >
            { !selectedReminder?<p>Select Reminder</p> :selectedReminder  }  
          </option>
          {SubjectArray.map(reminder => (
            <option key={reminder[0]} value={reminder[1].description} onSelect={()=>setId(reminder[0])}>
              {reminder[1].subject} ({reminder[1].description.substring(0, 30)})
            </option>
          ))}
        </select>
      </div>
      <div className="description">
        <label htmlFor="desc">Description:</label>
        <textarea id="desc" value={description} readOnly />
      </div>
     
       <button  onClick={()=>handleDisable(id,reminder[0])}>button</button>
       <Link to="/home"><button type="button">Back</button></Link>
       <Link to="/logout"><button type="button">Logout</button></Link>
     
    </div>
  );
}

export default DisableReminderSection;
