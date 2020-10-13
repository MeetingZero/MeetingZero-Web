import React from 'react';

const ErrorPage = () => {
  return (
    <div className="absolute-center-y">
      <h1 className="mb-1">
        Yikes! An error occured.
      </h1>

      <h5 className="text-center mb-2">
        Sorry about that. We are looking into it!
      </h5>

      <div className="text-center">
        <a href="/dashboard" className="h5">Go to Dashboard</a>
      </div>
    </div>
  );
}

export default ErrorPage;