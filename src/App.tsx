import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { AppHeader } from './Header/header';

import MainBody from './Body/mainBody';
import { Footer } from './Header/footer';
import {
  AppStageContext,
  LoginContext,
  AppStageContextProvider,
} from './contexts';
import { STAGES } from './constant';
function App() {
  const [loginDetails, setLoginDetails] = useState({
    isLoggedin: false,
    userName: 'Stranger',
    userEmail: '',
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
          });
        } else {
          setLoginDetails({
            isLoggedin: false,
            userName: 'Stranger',
            userEmail: '',
          });
        }
      });
  }, []);

  return (
    <LoginContext.Provider value={loginDetails}>
      <AppStageContextProvider>
        <div className="App">
          <div className="header">
            <AppHeader></AppHeader>
          </div>
          <div className="body">
            <MainBody></MainBody>
          </div>
          <div className="footer">
            <Footer></Footer>
          </div>
        </div>
      </AppStageContextProvider>
    </LoginContext.Provider>
  );
}

export default App;
