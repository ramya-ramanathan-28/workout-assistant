import React, { useContext } from 'react';
import { LoginContext } from '../contexts';
import { Login } from './login';


function ProfileInfo(props: { userName: React.ReactNode; src: string }) {
  return (
    <div style={{display:"flex", flexDirection: "row", alignItems:"center"}}>
      <img className="profile_pic_image" src={props.src} alt="profile" ></img>
      <strong style={{margin: "0 10px 0 0"}}>{props.userName}</strong>
      <Login text="Logout from Spotify"/>
    </div>
  );
}

export function AppHeader(props: any) {
  const { isLoggedin, userName, profilePicLink } = useContext(LoginContext);
  return (
    <div className="AppHeader">
      <a href="/" style={{color: "white", textDecoration: "none"}}>
        <strong style={{ fontSize: '40px' }}>Workout Assistant</strong>
      </a>
      <div className="ProfileInfo">
        {isLoggedin ? (
          <ProfileInfo userName={userName} src={profilePicLink}></ProfileInfo>
        ) : (
          <Login text="Continue with Spotify"></Login>
        )}
      </div>
    </div>
  );
}
