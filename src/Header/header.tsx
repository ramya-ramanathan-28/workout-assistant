import React, { useContext } from 'react';
import { LoginContext } from '../contexts';
import { Login } from './login';

function ProfileInfo(props: { userName: React.ReactNode }) {
  return <strong>{props.userName}</strong>;
}

export function AppHeader(props: any) {
  const { isLoggedin, userName } = useContext(LoginContext);
  return (
    <div className="AppHeader">
      <strong style={{ fontSize: '40px' }}>Workout Assistant</strong>
      <div className="ProfileInfo">
        {isLoggedin ? (
          <ProfileInfo userName={userName}></ProfileInfo>
        ) : (
          <Login></Login>
        )}
      </div>
    </div>
  );
}
