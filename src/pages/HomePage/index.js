import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'library/Button';

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
        <img src={logoImg} className="img-fluid" style={{width: 100}} alt="Logo" />

        <div>
          <h1 className="text-primary font-weight-normal ml-2 d-none d-xl-block">MeetingZero</h1>

          <h3 className="h5 ml-4 d-none d-xl-block text-primary font-weight-normal">Your team’s digital facilitator for all your real-time collaborative needs.</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img
            src={homeArrowsImg}
            className="img-fluid mb-4"
            style={{maxWidth: 800}}
            alt="Arrow Diagram"
          />

          <div className="mb-1">
            Get access to our early release!
          </div>

          <div className="homepage-email-input">
            <input
              type="email"
              className="form-control"
              placeholder="email address"
            />

            <Button
              type="submit"
              className="btn btn-primary"
              text="Submit"
            />
          </div>
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