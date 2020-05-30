import React from 'react';
import { Link } from 'react-router-dom'

import LogoSplitLayout from '../../layouts/LogoSplit';

import './Login.scss';

const Login = () => {
  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="text-right">
          <Link to="/sign-up">
            Sign up
          </Link>
        </div>

        <div className="container-small absolute-center-y">
          <input type="email" className="form-control mb-4" placeholder="Email" />

          <input type="password" className="form-control mb-4" placeholder="Password" />

          <div className="text-center mb-1">
            <button className="btn btn-primary px-5">Sign in</button>
          </div>

          <div className="text-center">
            <Link to="/forgot-password" className="small text-muted">
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default Login;