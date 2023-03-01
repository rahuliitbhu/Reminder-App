import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'
import Home from './Home.js'
import Setreminder from './Setreminder'
import DisableReminder from './DisableReminder'
import EnableReminder from './Enablereminder';
import ViewReminders from './Viewreminder';
import Test from './Test'
import Login from './Login';
import Signup from './Signup';
import ModifyReminder from './Modifyreminder';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Logout from './Logout';
import Thank from './Thank';
import { useEffect, useState } from 'react';
function App() {
  const [uid,setUser] = useState(null)
  useEffect(() => {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.uid)
        setUser(user.uid)
        
      }
    });
  }, []);
  return (

    <div className="App">
      <BrowserRouter>
      <Welcome/>

      <Route uid={uid} path="/modify/:paramid?">
      <ModifyReminder/>
      </Route>
      
      <Route  path="/login">
      <Login/>
      </Route>
      <Route  path="/signup">
      <Signup/>
      </Route>
      <Route  path="/home">
      <Home uid={uid}/>
      </Route>

      <Route  path="/setreminder/:paramid?">
      <Setreminder uid={uid}/>
      </Route>

      <Route  path="/disablereminder/:paramid?">
      <DisableReminder uid={uid}/>
      </Route>

      <Route  path="/enablereminder/:paramid?">
      <EnableReminder uid={uid}/>
      </Route>
      <Route  path="/viewreminder/:paramid?">
      <ViewReminders uid={uid}/>
      </Route>
      <Route  path="/logout">
      <Logout/>
      </Route>
      <Route  path="/thank">
      <Thank/>
      </Route>

      </BrowserRouter>
      
     
    </div>
  );
}

export default App;
