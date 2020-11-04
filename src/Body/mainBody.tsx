import React from 'react';
import LandingPage from '../components/graphs/LandingPage';
import { SelectionPage } from '../components/graphs/SelectionPage';

export default function MainBody(props: {
  stage: any;
  loggedin: boolean;
  loggeduser: React.ReactNode;
  setStage: (stage: number) => void;
}) {
  let comp = <div></div>;
  switch (props.stage) {
    case 0:
      comp = (
        <div>
          <LandingPage
            isLoggedIn={props.loggedin}
            userName={props.loggeduser}
            setStage={props.setStage}
          ></LandingPage>
        </div>
      );
      break;
    case 1:
      comp = <SelectionPage></SelectionPage>;
      break;
    default:
      comp = <div></div>;
  }
  return comp;
}
