import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { cableConsumer } from 'config/cableConsumer';
import * as workshopActions from 'app/workshop/actions';
import workshopSlice from 'app/workshop/slice';

import Squiggle from 'layouts/Squiggle';
import Button from 'library/Button';

import timeIcon from 'assets/images/time.svg';
import bathroomIcon from 'assets/images/bathroom.svg';
import anonymousIcon from 'assets/images/anonymous.svg';
import soundIcon from 'assets/images/sound.svg';
import musicIcon from 'assets/images/music.svg';
import lightbulbIcon from 'assets/images/light_bulb.svg';
import './WorkshopStart.scss';

const WorkshopStart = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(workshopActions.getWorkshop(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  React.useEffect(() => {
    cableConsumer(params.workshop_token)
    .subscriptions
    .create({
      channel: 'WorkshopChannel',
      workshop_token: params.workshop_token
    }, {
      received: (data) => {
        if (data.workshop) {
          return dispatch(workshopSlice.actions.setWorkshop(data.workshop));
        }

        if (data.workshop_members) {
          return dispatch(
            workshopSlice
            .actions
            .setWorkshopMembers(data.workshop_members)
          );
        }
      },
      connected: () => {
        console.log("WORKSHOP START CABLE CONNECTED!");
      }
    });
  }, [params.workshop_token, dispatch]);

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  React.useEffect(() => {
    if (workshop && workshop.started_at) {
      history.push(`/workshop/${params.workshop_token}`);
    }
  }, [workshop, params.workshop_token, history]);

  const startWorkshop = () => {
    dispatch(workshopActions.startWorkshop(params.workshop_token));
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("STARTING_WORKSHOP") >= 0;
  });

  return (
    <Squiggle>
      <div className="feather-card shadow mt-10 mb-3">
        <h4 className="font-weight-normal mb-1">Workshop Purpose</h4>

        <div>
          {workshop && workshop.purpose}
        </div>
      </div>

      {workshop && workshop.is_host ?
        <div className="feather-card shadow mb-10">
          <h4 className="font-weight-normal mb-1">Attendees</h4>

          <div>
            <WorkshopMembers />
          </div>
        </div>
      : null}

      <div className='requirements-list mb-4'>
        {workshop ?
          <div>
            <img src={timeIcon} alt='Time Icon' /> <div>Roughly {workshop.total_time / 60} Minutes</div>
          </div>
        : null}

        <div>
          <img src={bathroomIcon} alt='Bathroom Icon' /> <div>Bathroom break halfway through</div>
        </div>

        <div>
          <img src={anonymousIcon} alt='Anonymous Icon' /> <div>All responses are anonymous</div>
        </div>

        <div>
          <img src={soundIcon} alt='Sound Icon' /> <div>We work together, in silence, unless otherwise instructed</div>
        </div>

        <div>
          <img src={musicIcon} alt="Music Icon" /> <div>Non-lyrical music is a good way to remove the awkwardness of silence</div>
        </div>

        <div>
          <img src={lightbulbIcon} alt='Light Bulb Icon' /> <div>View Pro Tips for guidance, and follow along with an example in which building owners improve their tenets' experience</div>
        </div>
      </div>

      <div className="text-right mb-4">
        {workshop && workshop.is_host ?
          <Button
            onClick={startWorkshop}
            className="btn btn-primary px-3"
            text="Start Workshop"
            loading={isLoading}
          />
        :
          <div>Waiting for host to start the workshop...</div>
        }
      </div>
    </Squiggle>
  );
}

const WorkshopMembers = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [readyMembers, setReadyMembers] = React.useState(0);

  React.useEffect(() => {
    dispatch(workshopActions.getWorkshopMembers(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const workshopMembers = useSelector((state) => {
    return state.Workshop.workshopMembers;
  });

  React.useEffect(() => {
    let readyMembersNum = 0;

    workshopMembers.forEach((wm) => {
      if (wm.online) {
        readyMembersNum += 1;
      }
    });

    setReadyMembers(readyMembersNum);
  }, [workshopMembers]);

  return (
    <React.Fragment>
      {workshopMembers.map((member, index) => {
        if (member.user) {
          return (
            <React.Fragment key={member.id}>
              <span className={cn(member.online === false ? "text-muted" : null)}>
                {member.user.first_name}{index + 1 < workshopMembers.length ? ", " : null}
              </span>
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={member.id}>
            <span>
              {member.email}
            </span>
            {index + 1 < workshopMembers.length ? ", " : null}
          </React.Fragment>
        );
      })}

      <div className="small mt-1">
        {readyMembers}/{workshopMembers.length} participants ready
      </div>
    </React.Fragment>
  );
}

export default WorkshopStart;