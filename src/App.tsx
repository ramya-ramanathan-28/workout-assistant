import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './components/graphs/graph';
import { AppHeader } from './Header/header';
import LandingPage from './components/graphs/LandingPage';
import MainBody from './Body/mainBody';
import { Footer } from './Header/footer';
function App() {
  const [loggedin, setLogin] = useState(false);
  const [loggeduser, setLoginUser] = useState('Stranger');
  const [stageOfApp, setStageOfApp] = useState(0);
  useEffect(() => {
    fetch('http://localhost:5000/isLoggedIn')
      .then((response) => response.json())
      .then((data) => {
        setLogin(data.isLoggedIn);
        if (data.isLoggedIn) {
          setLoginUser(data.userName);
        }
      });
  });
  return (
    <>
      <div className="App">
        <div className="header">
          <AppHeader isLoggedIn={loggedin} userName={loggeduser}></AppHeader>
        </div>
        <div className="body">
          <MainBody
            loggedin={loggedin}
            loggeduser={loggeduser}
            stage={stageOfApp}
            setStage={(stage) => setStageOfApp(stage)}
          ></MainBody>
        </div>
        <div className="footer">
          <Footer
            loggedin={loggedin}
            stage={stageOfApp}
            setStage={(increase: boolean) =>
              setStageOfApp(increase ? stageOfApp + 1 : stageOfApp - 1)
            }
          ></Footer>
        </div>
      </div>
    </>
  );
}

export default App;
