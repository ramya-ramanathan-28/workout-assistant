import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { AppHeader } from './Header/header';

import MainBody from './Body/mainBody';
import { Footer } from './Header/footer';
import {
  AppStageContext,
  WorkoutContextProvider,
  LoginContext,
  AppStageContextProvider,
} from './contexts';
import { STAGES } from './constant';
function App() {
  const [loginDetails, setLoginDetails] = useState({
    isLoggedin: false,
    userName: 'friend',
    userEmail: '',
    profilePicLink: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/isLoggedIn')
      .then((response) => response.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setLoginDetails({
            isLoggedin: true,
            userName: data.userName,
            userEmail: data.eMailId,
            profilePicLink: data.profilePicLink
          });
        } else {
          setLoginDetails({
            isLoggedin: false,
            userName: 'friend',
            userEmail: '',
            profilePicLink: '',
          });
        }
      });
  }, []);
  
  return (
    <LoginContext.Provider value={
      {...loginDetails, 
      setLogin:(loginDetails: any)=>
        {
          setLoginDetails(loginDetails) 
        }
      }
      }>
      <AppStageContextProvider>
        <WorkoutContextProvider>
          <div className="App">
            <AppHeader />
            <div className="main">
              <MainBody></MainBody>
            </div>
            {/* <Footer /> */}
          </div>
        </WorkoutContextProvider>
      </AppStageContextProvider>
    </LoginContext.Provider>
  );
}

export default App;
