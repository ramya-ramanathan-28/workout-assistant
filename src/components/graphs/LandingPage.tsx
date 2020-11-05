import React, { useContext } from 'react';
import { LoginContext } from '../../contexts';
import { Login } from './../../Header/login';

import { SelectionPage } from './SelectionPage';

export default function LandingPage() {
  const { isLoggedin, userName } = useContext(LoginContext);
  return (
    <div className="landing-page-cont">
      <div className="landing-page-greeting">
        <strong>{`Hi, ${userName}!`}</strong>
      </div>
      <div className="landing-page-message">
        {isLoggedin
          ? 'Lets choose the intensity of your workout...'
          : 'Please login to begin.'}
      </div>
      {!isLoggedin && <Login text="Continue with Spotify"/>}
      {isLoggedin && <SelectionPage />}
    </div>
  );
}
