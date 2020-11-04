import { Button } from 'office-ui-fabric-react';
import React from 'react';

export default function LandingPage(props: {
  userName: React.ReactNode;
  isLoggedIn: boolean;
  setStage: (stage: number) => void;
}) {
  return (
    <div className="landing-page-cont">
      <div className="landing-page-greeting">
        <strong>
          Hi
          <br></br>
          {props.userName}
        </strong>
        <br></br>
      </div>
      <div className="landing-page-message">
        {props.isLoggedIn
          ? 'Lets Get Your Workout Started'
          : 'Before Anything Lets Login'}
      </div>
    </div>
  );
}
