import { Button } from 'office-ui-fabric-react';
import React, { useContext } from 'react';
import { LoginContext } from '../../contexts';

export default function LandingPage() {
  const { isLoggedin, userName } = useContext(LoginContext);
  return (
    <div className="landing-page-cont">
      <div className="landing-page-greeting">
        <strong>
          Hi
          <br></br>
          {userName}
        </strong>
        <br></br>
      </div>
      <div className="landing-page-message">
        {isLoggedin
          ? 'Lets Get Your Workout Started'
          : 'Before Anything Lets Login'}
      </div>
    </div>
  );
}
