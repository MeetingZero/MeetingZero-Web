import React from 'react';
import { Link } from 'react-router-dom';

import "./HomePage.scss";
import logoImg from "assets/images/logo.svg";
import homeArrowsImg from "assets/images/home_arrows.png";

const HomePage = () => {
  return (
    <div className="container-fluid p-3">
      <div className="text-right mt-3">
        <Link to="/login">
          Log In
        </Link>
      </div>

      <div className="d-flex align-items-end my-3 text-decoration-none mb-5">
        <img src={logoImg} className="img-fluid d-block" style={{width: 80}} alt="Logo" />

        <div>
          <h2 className="text-primary font-weight-normal ml-2 d-none d-xl-block">MeetingZero</h2>

          <h3 className="h6 ml-4 d-none d-xl-block text-primary">Your team’s digital facilitator for all your real-time collaborative needs.</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img src={homeArrowsImg} className="img-fluid" alt="Arrow Diagram" />
        </div>

        <div className="col-md-6">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              src="https://www.youtube.com/embed/k1bkmZz8yd4"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="MeetingZero Introductory Video"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;