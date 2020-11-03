import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './components/graphs/graph'
function App() {
  const [loggedin, setLogin] = useState(false);
  useEffect(() => {
    fetch('http://localhost:5000/isLoggedIn')
      .then((response) => response.json())
      .then((data) => {
        setLogin(data);
      });
  });
  const loginA = loggedin ? null : (
    <a href="http://localhost:5000/login">Login</a>
  );
  return (
    <>
      <Graph/>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {loginA}
          <SongList isLoggedin={loggedin}></SongList>
        </header>
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
