import React, { useContext } from 'react';
import { LoginContext } from '../contexts';
import { Login } from './login';

function ProfileInfo(props: { userName: React.ReactNode; src: string }) {
  return (
    <div>
      <img className="profile_pic_image" src={props.src}></img>
      <strong>{props.userName}</strong>
    </div>
  );
}

export function AppHeader(props: any) {
  const { isLoggedin, userName, profilePicLink } = useContext(LoginContext);
  return (
    <div className="AppHeader">
      <strong style={{ fontSize: '40px' }}>Workout Assistant</strong>
      <div className="ProfileInfo">
        {isLoggedin ? (
          <ProfileInfo userName={userName} src={profilePicLink}></ProfileInfo>
        ) : (
          <Login></Login>
        )}
      </div>
    </div>
  );
}
