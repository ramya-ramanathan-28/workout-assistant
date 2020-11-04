import { Button } from 'office-ui-fabric-react';
import React from 'react';
import { LoginContext } from '../../contexts';
import {Login} from "./../../Header/login"
import Graph from "./graph";

export default function LandingPage(props: {
  setStage: (stage: number) => void;
}) {
  return (
    <LoginContext.Consumer>
      {({ isLoggedin, userName }) => (
        <div className="landing-page-cont">
          <div className="landing-page-greeting">
            <strong>
              {`Hi, ${userName}!`}
            </strong>
          </div>
          <div className="landing-page-message">
            {isLoggedin
              ? 'Lets choose the intensity of your workout...'
              : 'Please login to begin.'}
          </div>
          { !isLoggedin && <Login/>}
          { isLoggedin && <Graph/>}
        </div>
      )}
    </LoginContext.Consumer>
  );
}
