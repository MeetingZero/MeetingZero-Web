import React from 'react';

import './LogoSplit.scss';
import logo from '../../assets/images/logo.svg';

const LogoSplit = (props) => {
  return (
    <div className='container-fluid px-0'>
      <div className='row no-gutters'>
        <div className='col-md-6 bg-secondary vh-100 d-none d-md-block'>
          <img src={logo} className='logo-split-logo' alt='MeetingZero Logo' />

          <h1 className='logo-split-title text-primary'>MeetingZero</h1>
        </div>
        <div className='col-md-6 vh-100'>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default LogoSplit;