import React from 'react';
import { useSelector } from 'react-redux';

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

        <p>
          Follow the instructions there on <br /> how to get everyone prepared for <br /> the workshop.
        </p>
      </div>
    </LogoSplitLayout>
  );
}

export default CreateWorkshopConfirmation;