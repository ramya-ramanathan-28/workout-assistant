import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './components/graphs/graph';
import { AppHeader } from './Header/header';
import LandingPage from './components/graphs/LandingPage';
import MainBody from './Body/mainBody';
import { Footer } from './Header/footer';
import { LoginContext } from './contexts';
function App() {
  const [loginDetails, setLoginDetails] = useState({
    isLoggedin: false,
    userName: 'Stranger',
    userEmail: '',
  });

  const [stageOfApp, setStageOfApp] = useState(0);

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
      <div className="App">
        <AppHeader/>
        <div className="main">
          <MainBody
            stage={stageOfApp}
            setStage={(stage) => setStageOfApp(stage)}
          ></MainBody>
        </div>
        <Footer
          stage={stageOfApp}
          setStage={(increase: boolean) =>
            setStageOfApp(increase ? stageOfApp + 1 : stageOfApp - 1)
          }
        />
      </div>
    </LoginContext.Provider>
  );
}

export default App;
