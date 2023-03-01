import React, { useState,useEffect } from "react";
import './Viewreminder.css'

import firebase from './firebase.js'
import { Link } from "react-router-dom";
const ViewReminders = ({uid}) => {
  let userId=uid
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  
  const [data,setData]=useState([])
  useEffect( ()=>{
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        userId=user.uid
        
      }
    });
      
      const result= firebase.firestore().collection('Reminders').get().then((dataRef)=>{
        
     
        const data =  dataRef.docs.map((doc)=>{
    
             return (doc.data().user_id==userId)?  ([doc.id,doc.data()]):[]
            
            
            })
         
         let mydata=data.filter((item)=>{
          return (item.length!=0)})
         setData(mydata)
          
         console.log(mydata)
         
           })
           

  },[])


  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await firebase.firestore()
        .collection('Reminders')
        .doc(id)
        .delete();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const subjects = ["Meeting", "Task", "Follow Up", "Reminder"];


  return (
    <div className="view-reminders-section">
            <h1>
            View Reminder
        </h1>
      <div className="select-dates">
        <div className="from-date">
          <label htmlFor="from">Select From Date:</label>
          <input
            type="date"
            id="from"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="to-date">
          <label htmlFor="to">Select To Date:</label>
          <input
            type="date"
            id="to"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>
      <div className="select-subject">
        <label htmlFor="subject">Subject:</label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="" >
            Select a subject
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>


     
  {
    
    
    <table className="reminders-table">
     <thead>
       <tr>
       <th>Date</th>
         <th>Subject</th>
        <th> Description</th>
<th>Email Address</th>
<th>Contact No.</th>
<th>SMS No.</th>
<th>Status</th>
<th>Recurrence Frequency</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{data.filter((reminder) => {
           if (
             (selectedSubject && reminder[1].subject !== selectedSubject) ||
             (fromDate && new Date(reminder[1].date) < new Date(fromDate)) ||
             (toDate && new Date(reminder[1].date) > new Date(toDate))
           ) {
             return false;
           }
           return true;
         }).map((reminder) => (
           

           <tr key={reminder[0]}>


<td>{reminder[1].date}</td>
<td>{reminder[1].subject}</td>
<td>{reminder[1].description}</td>
<td>{reminder[1].email}</td>
<td>{reminder[1].contactNumber}</td>
<td>{reminder[1].smsNumber}</td>
<td>{reminder[1].status}</td>
<td>{
reminder[1].recurrence.recur7Days?<p>7Days</p>:<></>}
{
reminder[1].recurrence.recur5Days?<p>5Days</p>:<></>}
{
reminder[1].recurrence.recur3Days?<p>3Days</p>:<></>}
{
reminder[1].recurrence.recur2Days?<p>2Days</p>:<></>}
</td>
<td>

     <button onClick={()=>handleDelete(reminder[0])}>Delete</button>

{
reminder[1].status=="active"?<Link to={`/disablereminder/${reminder[0]}`}><button className="action-button">Disable</button></Link>:<Link to={`/enablereminder/${reminder[0]}`}><button className="action-button">Enable</button></Link>
}   

<Link to={`/modify/${reminder[0]}`}><button className="action-button">Modify</button></Link>

</td>

</tr>
))
         

}
</tbody>
</table>
  }

      </div>
     
</div>
);
};

export default ViewReminders;
