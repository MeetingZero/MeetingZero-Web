import React from 'react';

import { cableConsumer } from '../../config/cableConsumer';

import Squiggle from '../../layouts/Squiggle';

import timeIcon from '../../assets/images/time.svg';
import bathroomIcon from '../../assets/images/bathroom.svg';
import anonymousIcon from '../../assets/images/anonymous.svg';
import soundIcon from '../../assets/images/sound.svg';
import musicIcon from '../../assets/images/music.svg';
import lightbulbIcon from '../../assets/images/light_bulb.svg';
import './WorkshopStart.scss';

const WorkshopStart = () => {
  cableConsumer()
  .subscriptions
  .create({
    channel: 'WorkshopChannel'
  }, {
    received: (data) => {
      console.log(data);
    },
    connected: () => {
      console.log("CONNECTED!!");
    }
  });

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

      <ul className='requirements-list mb-4'>
        <li>
          <img src={timeIcon} alt='Time Icon' /> <div>65 Minutes</div>
        </li>

        <li>
          <img src={bathroomIcon} alt='Bathroom Icon' /> <div>Bathroom break halfway through</div>
        </li>

        <li>
          <img src={anonymousIcon} alt='Anonymous Icon' /> <div>All responses are anonymous</div>
        </li>

        <li>
          <img src={soundIcon} alt='Sound Icon' /> <div>We work together, in silence, unless otherwise instructed</div>
        </li>

        <li>
          <img src={musicIcon} alt="Music Icon" /> <div>Non-lyrical music is a good way to remove the awkwardness of silence</div>
        </li>

        <li>
          <img src={lightbulbIcon} alt='Light Bulb Icon' /> <div>View Pro Tips for guidance, and follow along with an example in which building owners improve their tenets' experience</div>
        </li>
      </ul>

      <div className="text-right pr-8">
        <button className="btn btn-primary px-3">
          Start Workshop
        </button>
      </div>
    </Squiggle>
  );
}

export default WorkshopStart;