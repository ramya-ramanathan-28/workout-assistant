import React from 'react';
import { LoginContext } from '../contexts';
import { Login } from './login';

function ProfileInfo(props: { userName: React.ReactNode }) {
  return <strong>{props.userName}</strong>;
}

export function AppHeader(props: any) {
  return (
    <LoginContext.Consumer>
      {({ isLoggedin, userName }) => (
        <div className="AppHeader">
          <strong>Workout Assistant</strong>
          <div className="ProfileInfo">
            {isLoggedin ? (
              <ProfileInfo userName={userName}></ProfileInfo>
            ) : (
              <Login></Login>
            )}
          </div>
        </div>
      )}
    </LoginContext.Consumer>
  );
}
