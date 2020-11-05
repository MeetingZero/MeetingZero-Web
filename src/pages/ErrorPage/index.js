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
        <button
          onClick={() => window.location.reload()}
          type="button"
          className="btn btn-primary btn-square rounded px-3"
        >
          Click Here to Reload the Page
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;