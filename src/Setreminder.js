import React, { useState,useEffect } from "react";
import "./Setreminder.css";

import firebase from './firebase.js'
import { Link } from "react-router-dom";
const subjectOptions = ["Meeting", "Task", "Follow Up", "Reminder"];

const ReminderSection = ({uid}) => {
  const [User,setUser]=useState(null)  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [smsNumber, setSmsNumber] = useState("");
  const [recur7Days, setRecur7Days] = useState(false);
  const [recur5Days, setRecur5Days] = useState(false);
  const [recur3Days, setRecur3Days] = useState(false);
  const [recur2Days, setRecur2Days] = useState(false);


   

  const handleSubmit= async (e)=>{
    e.preventDefault()
    await firebase.firestore().collection('Reminders').add({
        user_id:uid,
        date:selectedDate,
        subject:selectedSubject,
        description:description,
        email:email,
        contactNumber:contactNumber,
        smsNumber:smsNumber,
        recurrence:{
            recur2Days:recur2Days,
            recur3Days:recur3Days,
            recur5Days:recur5Days,
            recur7Days:recur7Days
        },
        status:"active"

        })
        .then((data)=>{
          console.log(data)
      })
  }



  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <form className="reminder-section" onSubmit={handleSubmit}>
        <h1>
            Set Reminder
        </h1>
        <div className="select-date">
        <label htmlFor="date">Select a Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="subject">
        <label htmlFor="subject">Subject:</label>
        <select id="subject" value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">Please select a subject</option>
          {subjectOptions.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className="description">
        <label htmlFor="description">Add Description:</label>
        <textarea
          id="description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="email-address">
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="contact-number">
        <label htmlFor="contact-number">Contact No:</label>
        <input
          type="tel"
          id="contact-number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>
      <div className="sms-number">
        <label htmlFor="sms-number">SMS No:</label>
        <input
          type="tel"
          id="sms-number"
         
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
      <div className="actions">
      <button type="submit" >Confirm</button>
          <Link to="/home"><button type="button">Back</button></Link>
          <Link to="/logout"><button type="button">Logout</button></Link>
        
      </div>
    </form>
  );
};

export default ReminderSection;
