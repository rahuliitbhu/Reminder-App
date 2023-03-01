import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "./firebase";
import "./Home.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedDate = `${days[today.getDay()]}, ${today.getDate()} of ${months[today.getMonth()]}`;
    setFormattedDate(formattedDate);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user)
        setUsername(user.displayName);
      }
    });
  }, []);

  return (
    <div className="home">
      <div className="welcome-section">
        <h1 className="welcome-text">Welcome to Reminder application {username}</h1>
     
      </div>

      <div className="date-section">
        <p className="date-text">
         Today is {formattedDate}
        </p>
      </div>

      <div className="buttons-section">
        <Link to="/setreminder"><button className="button">Set Reminder</button></Link>
        
        <Link to="/modify"><button className="button">Modify Reminder</button></Link>
        <Link to="/diablereminder"><button className="button">Disable Reminder</button></Link>
        <Link to="/deletereminder"><button className="button">Delete Reminder</button></Link>
        <Link to="/enablereminder"> <button className="button">Enable Reminder</button></Link>
        <Link to="/viewreminder"> <button className="button">View your Reminders</button></Link>
       
      </div>

      <div className="logout-section">
        <Link to="/logout"> <button className="logout-button">Logout</button></Link>
       
      </div>
    </div>
  );
};

export default Home;
