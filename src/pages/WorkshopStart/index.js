import React from 'react';

import Squiggle from '../../layouts/Squiggle';

import timeIcon from '../../assets/images/time.svg';
import bathroomIcon from '../../assets/images/bathroom.svg';
import anonymousIcon from '../../assets/images/anonymous.svg';
import soundIcon from '../../assets/images/sound.svg';
import musicIcon from '../../assets/images/music.svg';
import lightbulbIcon from '../../assets/images/light_bulb.svg';
import './WorkshopStart.scss';

const WorkshopStart = () => {
  return (
    <Squiggle>
      <div className="feather-card mt-10 mb-3">
        <h4 className="font-weight-normal mb-1">Workshop Purpose</h4>

        <div>
          Make sure all copy is finalized
        </div>
      </div>

      <div className="feather-card mb-10">
        <h4 className="font-weight-normal mb-1">Attendees</h4>

        <div>
          Make sure all copy is finalized
        </div>
      </div>

      <ul className='requirements-list'>
        <li>
          <img src={timeIcon} /> <div>65 Minutes</div>
        </li>

        <li>
          <img src={bathroomIcon} /> <div>Bathroom break halfway through</div>
        </li>

        <li>
          <img src={anonymousIcon} /> <div>All responses are anonymous</div>
        </li>

        <li>
          <img src={soundIcon} /> <div>We work together, in silence, unless otherwise instructed</div>
        </li>

        <li>
          <img src={musicIcon} /> <div>Non-lyrical music is a good way to remove the awkwardness of silence</div>
        </li>

        <li>
          <img src={lightbulbIcon} /> <div>View Pro Tips for guidance, and follow along with an example in which building owners improve their tenets' experience</div>
        </li>
      </ul>
    </Squiggle>
  );
}

export default WorkshopStart;