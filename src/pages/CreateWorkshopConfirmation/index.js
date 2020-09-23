import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoSplitLayout from 'layouts/LogoSplit';

const CreateWorkshopConfirmation = () => {
  const currentUser = useSelector((state) => {
    return state.User.currentUser;
  });

  return (
    <LogoSplitLayout>
      <div className="text-center absolute-center-y">
        <h5 className="mb-1">Your workshop has been created!</h5>

        <p>
          We've sent an email to {currentUser.email}.
        </p>

        <p className="mb-5">
          Follow the instructions there on <br /> how to get everyone prepared for <br /> the workshop.
        </p>

        <div className="text-center">
          <Link to="/dashboard" className="h5 font-weight-normal">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default CreateWorkshopConfirmation;