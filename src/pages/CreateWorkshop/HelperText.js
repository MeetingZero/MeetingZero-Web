import React from 'react';

const HelperText = ({
  pssKey,
  showPreparation
}) => {
  return (
    <div className="border p-2 mx-auto bg-white rounded mt-10" style={{maxWidth: 370}}>
      {pssKey === "GENERAL_TOPIC" && !showPreparation ?
        <React.Fragment>
          <div className="text-muted mb-2">
            Examples
          </div>

          <ul className="mb-2">
            <li>The conversion flow of our checkout</li>
            <li>Our internal design process</li>
            <li>Improving our office environment</li>
            <li>How we organise events</li>
            <li>Keeping up with our competition</li>
            <li>Improving sales flow</li>
            <li>Tactics for the next sales push</li>
          </ul>

          <div className="text-muted mb-2">
            Broad topic
          </div>

          <div>
            This is a statement. It is not an opinion, question, problem, assumption, or solution.
          </div>
        </React.Fragment>
      : null}

      {pssKey === "EXISTING_PROBLEMS" && !showPreparation ?
        <React.Fragment>
          <div className="h1 mb-2">
            Examples
          </div>

          <ul>
            <li>Users keep dropping off at our login page</li>
            <li>Some of our CTAs are not color accessible</li>
            <li>Our sales among 18-24 year olds are down 40% this quarter</li>
          </ul>
        </React.Fragment>
      : null}

      {pssKey === "EXISTING_SOLUTIONS" && !showPreparation ?
        <React.Fragment>
          <div className="h1 mb-2">
            Examples
          </div>

          <ul>
            <li>I want to add a messaging feature</li>
            <li>We should increase the price of our enterprise membership to $20 per month</li>
            <li>We should add an interactive onboarding experience so first time users have a better sense of what our app does</li>
          </ul>
        </React.Fragment>
      : null}

      {showPreparation ?
        <React.Fragment>
          <div className="h1 mb-2">
            Preparation and invitations
          </div>

          <p>
            Is there anything you want your teammates to catch up on before this? Applicable metrics, any relevant articles?
          </p>

          <p>
            Make sure you invite the right people. This works best with a cross-functional team.
          </p>
        </React.Fragment>
      : null}
    </div>
  );
}

export default HelperText;
