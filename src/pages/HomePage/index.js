import React from 'react';
import { Link } from 'react-router-dom';

import "./HomePage.scss";
import logoImg from "assets/images/logo.svg";
import homeArrowsImg from "assets/images/home_arrows.png";
import handImg from "assets/images/hand_image.png";
import largeGreenCheckImg from "assets/images/large_green_check.png";
import largeRedXImg from "assets/images/large_red_x.svg";

const HomePage = () => {

  return (
    <div className="container-fluid px-0">
      <div className="d-flex align-items-end mb-lg-3 text-decoration-none p-3">
        <img src={logoImg} className="img-fluid" style={{width: 100}} alt="Logo" />

        <div>
          <h1 className="text-primary font-weight-normal ml-2 d-none d-xl-block">MeetingZero</h1>

          <h3 className="h5 ml-4 d-none d-xl-block text-primary font-weight-normal">Your team’s digital facilitator for all your real-time collaborative needs.</h3>
        </div>
      </div>

      <div className="row p-3 no-gutters">
        <div className="col-md-6 mt-5 px-1">
          <img
            src={homeArrowsImg}
            className="img-fluid mb-6"
            style={{maxWidth: 800}}
            alt="Arrow Diagram"
          />

          <div className="mb-2 text-center text-md-left">
            <Link to="/sign-up" className="btn btn-primary px-5">
              Sign Up
            </Link>
          </div>

          <div className="text-center text-md-left">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>

        <div className="col-md-6 mt-5 px-1">
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
              <img src={largeGreenCheckImg} className="img-fluid d-none d-md-block" alt="Green Check" />

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
              <img src={largeRedXImg} className="img-fluid d-none d-md-block" alt="Red X" />

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

        <div className="row">
          <div className="col-md-4 mt-3">
            <div className="d-flex align-items-center">
              <div className="h3">
                1
              </div>

              <div className="ml-2">
                Have a topic to discuss
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-3">
            <div className="d-flex align-items-center">
              <div className="h3">
                2
              </div>

              <div className="ml-2">
                Select your unique MeetingZero workshop
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-3">
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

        <div className="row">
          <div className="col-md-4 mt-3">
            <div className="d-flex align-items-center">
              <div className="h3">
                4
              </div>

              <div className="ml-2">
                Align on a problem to solve
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-3">
            <div className="d-flex align-items-center">
              <div className="h3">
                5
              </div>

              <div className="ml-2">
                Align on solutions, objectives, or designs to test
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-3">
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
          <div className="col-md-4 mt-3"></div>

          <div className="col-md-4 mt-3">
            <div className="d-flex align-items-center">
              <div className="h3">
                7
              </div>

              <div className="ml-2">
                Gain visibility into how decisions were made via an auto-generated report
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-3"></div>
        </div>
      </div>

      <div className="bg-primary p-3">
        <div className="container text-white mb-10">
          <h2 className="mb-3">Why we're here</h2>

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
            These inefficiencies cost an estimated <a href="https://meeting-report.com/" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">$400 billion</a> a year in the US.
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

          <div className="border-top my-3" />

          <h2 className="mb-3">Who we're helping</h2>

          <p>
            Without a set of tools and processes in place, meetings inevitably go off-topic and devolve into unstructured discussions. The introverts and juniors in the room don’t feel comfortable speaking up, even if they think they might have the right solution, and often times leaders find it hard to align on decisions.
          </p>

          <p>
            One person does all the talking. Everyone understands the problems differently. No tangible outcomes are produced, and another meeting is needed. Meetings like this are deadly to productive work, not only because they are excruciatingly dull to be in, but also because they don’t do their main job: Providing alignment and clear next steps for a project.
          </p>

          <div className="border-top my-3" />

          <h2 className="mb-3">How we're making your life easier</h2>

          <p>
            MeetingZero fundamentally changes the way collaborative work is done.
          </p>

          <p>
            It streamlines processes to eliminate unstructured discussion to help teams do their best work.
          </p>

          <p>
            If you want to easily get your team to a place where synchronous working sessions are more productive, check out MeetingZero.
          </p>

          <div className="border-top my-3" />
        </div>

        <div className="text-center text-white">
          &copy; MeetingZero - All rights reserved.
        </div>

        <a href="https://meetingzero.s3.us-west-2.amazonaws.com/meetingzero_terms.pdf" className="text-white d-block text-center text-decoration-underline">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

export default HomePage;