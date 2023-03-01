import React, { useState,useEffect } from "react";
import firebase from './firebase.js'
import './Enablereminder.css'
import {Link, useParams} from 'react-router-dom'
const EnableReminder = ({uid}) => {
  let {paramid}=useParams()
  let userId;
  const [id,setId] =useState("")
  const [selectedDate, setSelectedDate] = useState("");
  const [DateArray, setDateArray] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [SubjectArray, setSubjectArray] = useState([]);
  const [selectedReminder, setSelectedReminder] = useState("");
  const [description, setDescription] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [smsNumber, setSmsNumber] = useState("");
  const [recur7Days, setRecur7Days] = useState(false);
  const [recur5Days, setRecur5Days] = useState(false);
  const [recur3Days, setRecur3Days] = useState(false);
  const [recur2Days, setRecur2Days] = useState(false);
  const [reminder,setReminder]=useState([]);
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
      
        return (doc.data().user_id==userId)?  ([doc.id,doc.data()]):[]})
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
              setContactNumber(item[1].contactNumber)
              setDescription(item[1].description)
              setSelectedSubject(item[1].subject)
              setSelectedReminder(item[1].description.substring(0, 30))
              setEmailAddress(item[1].email)
              setSmsNumber(item[1].smsNumber)
              setRecur2Days(item[1].recurrence.recur2Days)
              setRecur3Days(item[1].recurrence.recur3Days)
              setRecur5Days(item[1].recurrence.recur5Days)
              setRecur7Days(item[1].recurrence.recur7Days)
             


         }


    })
  //  console.log(paramid)
   
}


const handleEnable= async(uid,id)=>{
  try{
    const res= await firebase.firestore().collection('Reminders').where("user_id","==",uid).get().then((doc)=>{
    doc.forEach((doc)=>
    {
      if(doc.id==id)
    
      { const res= firebase.firestore().collection('Reminders').doc(id).update({
          status:"active"
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
  //setReminder(newdata)
  setDescription(newdata[1].description);
  setContactNumber(newdata[1].contactNumber);
  setEmailAddress(newdata[1].email)
  setSmsNumber(newdata[1].smsNumber)
  setRecur2Days(newdata[1].recurrence.recur2Days)
  setRecur3Days(newdata[1].recurrence.recur3Days)
  setRecur5Days(newdata[1].recurrence.recur5Days)
  setRecur7Days(newdata[1].recurrence.recur7Days)
  setReminder(newdata)
  console.log(newdata)
};


const handleDateChange =(e)=>{
  e.preventDefault()
  setSelectedDate("")
  setDescription("")
  setSelectedReminder("")
  setSelectedSubject("")
   const newdata=data.filter((reminder)=>{
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
    <div className="enable-reminder-section">
            <h1>
            Enable Reminder
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
        <select
          id="subject"
          value={selectedSubject}
          onChange={handleSubjectChange}
        >
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
          <option value="" disabled>
            { !selectedReminder?<p>Select Reminder</p> :selectedReminder  }  
          </option>
          {SubjectArray.map((reminder) => (
            <option key={reminder[0]} value={reminder[1].description} >
            {reminder[1].subject} ({reminder[1].description.substring(0, 30)})
          </option>
          ))}
        </select>
      </div>
      <div className="description">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="email-address">
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>
      <div className="contact-number">
        <label htmlFor="contact">Contact No:</label>
        <input
          type="tel"
          id="contact"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          />
          </div>
          <div className="sms-number">
          <label htmlFor="sms">SMS No:</label>
          <input
          type="tel"
          id="sms"
          value={smsNumber}
          onChange={(e) => setSmsNumber(e.target.value)}
          />
          </div>
          <div className="recur-for-next">
        <label>Recur for next:</label>
        <div>
          <input
            type="checkbox"
            id="recur7Days"
            checked={recur7Days}
            onChange={(e) => setRecur7Days(e.target.checked)}
          />
          <label htmlFor="recur7Days">7 Days</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="recur5Days"
            checked={recur5Days}
            onChange={(e) => setRecur5Days(e.target.checked)}
          />
          <label htmlFor="recur5Days">5 Days</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="recur3Days"
            checked={recur3Days}
            onChange={(e) => setRecur3Days(e.target.checked)}
          />
          <label htmlFor="recur3Days">3 Days</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="recur2Days"
            checked={recur2Days}
            onChange={(e) => setRecur2Days(e.target.checked)}
          />
          <label htmlFor="recur2Days">2 Days</label>
        </div>
      </div>
          <div className="buttons">
          <Link to="/thank"><button type="button" onClick={()=>handleEnable(id,reminder[0])}>Confirm</button></Link>
          <Link to="/home"><button type="button">Back</button></Link>
          <Link to="/logout"><button type="button">Logout</button></Link>
          </div>
        
          </div>
          );
          };
          
          export default EnableReminder;
