import React from 'react';

const HelperText = ({
  pssKey
}) => {
  return (
    <div className="border p-2 mx-auto bg-white rounded mt-10" style={{maxWidth: 370}}>
      {pssKey === "GENERAL_TOPIC" ?
        <React.Fragment>
          <div className="text-muted">
            Examples
          </div>

          <ul>
            <li>The conversion flow of our checkout</li>
            <li>Our internal design process</li>
            <li>Improving our office environment</li>
            <li>How we organise events</li>
            <li>Keeping up with our competition</li>
            <li>Improving sales flow</li>
            <li>Tactics for the next sales push</li>
          </ul>

          <div className="text-muted">
            Broad topic
          </div>

          <div>
            This is a statement. It is not an opinion, question, problem, assumption, or solution.
          </div>
        </React.Fragment>
      : null}
    </div>
  );
}

export default HelperText;
