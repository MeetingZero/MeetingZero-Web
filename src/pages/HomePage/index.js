import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'library/Button';

import "./HomePage.scss";
import logoImg from "assets/images/logo.svg";
import homeArrowsImg from "assets/images/home_arrows.png";
import handImg from "assets/images/hand_image.png";
import largeGreenCheckImg from "assets/images/large_green_check.png";
import largeRedXImg from "assets/images/large_red_x.svg";

const HomePage = () => {
  return (
    <div className="container-fluid px-0">
      <div className="text-right p-3">
        <Link to="/login">
          Log In
        </Link>
      </div>

      <div className="d-flex align-items-end my-3 text-decoration-none mb-5 p-3">
        <img src={logoImg} className="img-fluid" style={{width: 100}} alt="Logo" />

        <div>
          <h1 className="text-primary font-weight-normal ml-2 d-none d-xl-block">MeetingZero</h1>

          <h3 className="h5 ml-4 d-none d-xl-block text-primary font-weight-normal">Your team’s digital facilitator for all your real-time collaborative needs.</h3>
        </div>
      </div>

      <div className="row p-3">
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

      <div
        className="homepage-banner text-center"
        style={{backgroundImage: `url(${handImg})`}}
      >
        <h1>What MeetingZero Does</h1>

        <h2 className="h6 mb-5">Add structure to your meetings to keep everyone moving forward together</h2>

        <div className="row">
          <div className="col-md-6">
            <div className="homepage-banner-content mx-auto">
              <img src={largeGreenCheckImg} className="img-fluid" />

              <div className="homepage-banner-content-text">
                <h3>Creates</h3>

                <p>
                  Company alignment at scale<br />
                  Clear team goals<br />
                  Increased return on time invested<br />
                  High-performance teams<br />
                  Collective focus
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="homepage-banner-content mx-auto">
              <img src={largeRedXImg} className="img-fluid" />

              <div className="homepage-banner-content-text">
                <h3>Destroys</h3>

                <p>
                  Unconscious biases<br />
                  Groupthink<br />
                  Interruptions<br />
                  Ramblings<br />
                  Busy work<br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container p-5">
        <h1 className="text-center font-weight-bold mb-3">How MeetingZero Works</h1>

        <div className="row mb-3">
          <div className="col-md-4">
            <div className="d-flex align-items-center">
              <div className="h3">
                1
              </div>

              <div className="ml-2">
                Have a topic to discuss
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="d-flex align-items-center">
              <div className="h3">
                2
              </div>

              <div className="ml-2">
                Select your unique MeetingZero workshop
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="d-flex align-items-center">
              <div className="h3">
                3
              </div>

              <div className="ml-2">
                Work mostly in silence, together
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <div className="d-flex align-items-center">
              <div className="h3">
                4
              </div>

              <div className="ml-2">
                Align on a problem to solve
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="d-flex align-items-center">
              <div className="h3">
                5
              </div>

              <div className="ml-2">
                Align on solutions, objectives, or designs to test
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="d-flex align-items-center">
              <div className="h3">
                6
              </div>

              <div className="ml-2">
                Assign owners to tasks
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4"></div>

          <div className="col-md-4">
            <div className="d-flex align-items-center">
              <div className="h3">
                7
              </div>

              <div className="ml-2">
                Gain visibility into how decisions were made via an auto-generated report
              </div>
            </div>
          </div>

          <div className="col-md-4"></div>
        </div>
      </div>

      <div className="bg-primary p-3">
        <div className="container-small text-white">
          <h3>Why we're here</h3>

          <p>
            The way teams work together is fundamentally broken. No matter the team or company size, the horrors of teamwork stay the same:
          </p>

          <p>
            - Unstructured meetings that produce no outcome<br />
            - Lengthy decision-making processes<br />
            - Politically-driven teams<br />
            - Very little time to get meaningful work done<br />
          </p>

          <p>
            These inefficiencies cost an estimated <a href="https://meeting-report.com/" target="_blank" className="text-cyan">$400 billion</a> a year in the US.
          </p>

          <p>
            The core problem isn’t the people or companies. The problem is that there are no processes in place to support effective collaboration for synchronous group interactions, virtually or onsite.
          </p>

          <p>
            Differences in how people work and politics that always creep into any group setting are just part of the overall problem. The underlying issue is that conventional collaboration scenarios don’t address that!
          </p>

          <p>
            We are here to do exactly that.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;