import { Button } from 'office-ui-fabric-react';
import React from 'react';
import { LoginContext } from '../../contexts';

export default function LandingPage(props: {
  setStage: (stage: number) => void;
}) {
  return (
    <LoginContext.Consumer>
      {({ isLoggedin, userName }) => (
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
      )}
    </LoginContext.Consumer>
  );
}
