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

function SongList(props: any) {
  const isloggedin = props.isLoggedin;
  const [showSongs, setShowSongs] = useState(false);
  const [songsList, setSongsList] = useState([]);
  useEffect(() => {
    if (showSongs) {
      fetch('http://localhost:5000/api/songs').then((response) =>
        response.json().then((res) => setSongsList(res.items))
      );
    }
  }, [showSongs]);
  if (isloggedin) {
    const listItems = songsList.map((item: { track: { name: '' } }) => {
      let name = item.track.name;
      return <li>{name}</li>;
    });
    const ShowSongs = showSongs ? <ul>{listItems}</ul> : null;
    return (
      <div>
        <button
          disabled={!isloggedin}
          onClick={() => {
            setShowSongs(!showSongs);
          }}
        >
          ShowSongs
        </button>
        {ShowSongs}
      </div>
    );
  } else {
    return <button disabled={!props.isloggedin}>ShowSongs</button>;
  }
}

export default App;
