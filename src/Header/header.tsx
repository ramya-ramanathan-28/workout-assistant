import React from 'react';
import { Login } from './login';

function ProfileInfo(props: { userName: React.ReactNode }) {
  return <strong>{props.userName}</strong>;
}

export function AppHeader(props: any) {
  return (
    <div className="AppHeader">
      <strong>Workout Assistant</strong>
      <div className="ProfileInfo">
        {props.isLoggedIn ? (
          <ProfileInfo userName={props.userName}></ProfileInfo>
        ) : (
          <Login></Login>
        )}
      </div>
    </div>
  );
}
