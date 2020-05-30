import React from 'react';
import { Link } from 'react-router-dom'

import LogoSplitLayout from '../../layouts/LogoSplit';

const SignUp = () => {
  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="text-right">
          <Link to="/login">
            Login
          </Link>
        </div>

        <div className="container-small absolute-center-y">
          <div className="row mb-4">
            <div className="col-md-6 mb-4 mb-md-0">
              <input type="text" className="form-control" placeholder="First name" />
            </div>

            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Last name" />
            </div>
          </div>

          <input type="email" className="form-control mb-4" placeholder="Email" />

          <input type="password" className="form-control mb-1" placeholder="Password" />

          <div className="text-muted small mb-4">
            Must include: 8 characters minimum, 1 number or symbol
          </div>

          <input type="password" className="form-control mb-4" placeholder="Confirm password" />

          <div className="text-center">
            <button className="btn btn-primary px-5">Sign up</button>
          </div>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default SignUp;