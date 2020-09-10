import React from 'react';
import { useParams, Link } from 'react-router-dom';

const WorkshopDone = () => {
  const params = useParams();

  return (
    <div className="absolute-center-y text-center">
      <h1 className="text-center display-2 mb-1">Thanks! Your workshop is now complete.</h1>

      <h5 className="text-center mb-3">
        Please check your email for a short survey of your experience. Thank you for using MeetingZero!
      </h5>

      <Link to={`/past-workshops/${params.workshop_token}`} className="btn btn-primary px-2 py-2">
        View Workshop Summary
      </Link>
    </div>
  );
}

export default WorkshopDone;