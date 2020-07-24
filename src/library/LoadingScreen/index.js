import React from 'react'

import logo from 'assets/images/logo.svg';
import './LoadingScreen.scss';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={logo} alt="Loading Screen Logo" />

      <h1 className="text-primary">Loading...</h1>
    </div>
  );
}

export default LoadingScreen;