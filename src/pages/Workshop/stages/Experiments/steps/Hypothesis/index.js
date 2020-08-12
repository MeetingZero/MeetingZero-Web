import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';
import ProTip from 'library/ProTip';

import * as experimentsActions from 'app/workshop/stages/experiments/actions';

const Hypothesis = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const [weBelieveTextCharCountExceeded, setWeBelieveTextCharCountExceeded] = React.useState(false);
  const [willResultInTextCharCountExceeded, setWillResultInTextCharCountExceeded] = React.useState(false);
  const [succeededWhenTextCharCountExceeded, setSucceededWhenTextCharCountExceeded] = React.useState(false);

  const [weBelieveText, setWeBelieveText] = React.useState("");
  const [willResultInText, setWillResultInText] = React.useState("");
  const [succeededWhenText, setSucceededWhenText] = React.useState("");

  // Get hypothesis on page load for editing and validation purposes
  React.useEffect(() => {
    dispatch(experimentsActions.getHypothesis(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const onSubmit = (formData) => {
    dispatch(
      experimentsActions
      .saveHypothesis(
        params.workshop_token,
        formData.we_believe_text,
        formData.will_result_in_text,
        formData.succeeded_when_text
      )
    );
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("SAVE_EXPERIMENT_HYPOTHESIS") >= 0;
  });

  const hypothesis = useSelector((state) => {
    return state.Experiment.hypothesis;
  });

  React.useEffect(() => {
    if (!hypothesis) return;

    if (hypothesis.we_believe_text) {
      setWeBelieveText(hypothesis.we_believe_text);
    }

    if (hypothesis.will_result_in_text) {
      setWillResultInText(hypothesis.will_result_in_text);
    }

    if (hypothesis.succeeded_when_text) {
      setSucceededWhenText(hypothesis.succeeded_when_text);
    }
  }, [hypothesis]);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Experiments</h1>

      <h5 className="mb-4">Create a hypothesis that you can test in 1-2 weeks.</h5>

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          onChange={(event) => setWeBelieveText(event.target.value)}
          value={weBelieveText}
          ref={register({ required: true, maxLength: 140 })}
          name="we_believe_text"
          className={cn("form-control mb-1", weBelieveTextCharCountExceeded ? 'bg-scary' : null)}
          placeholder="We believe <this capability>..."
        />

        {errors.we_believe_text ?
          <div className="small text-danger">
            Please enter a response of 140 characters or less
          </div>
        : null}

        <div className="text-right mb-4">
          <CharacterCounter
            inputString={weBelieveText}
            maxChars={140}
            onExceed={(isExceeded) => setWeBelieveTextCharCountExceeded(isExceeded)}
          />
        </div>

        <textarea
          onChange={(event) => setWillResultInText(event.target.value)}
          value={willResultInText}
          ref={register({ required: true, maxLength: 140 })}
          name="will_result_in_text"
          className={cn("form-control mb-1", willResultInTextCharCountExceeded ? 'bg-scary' : null)}
          placeholder="Will result in <this outcome>..."
        />

        {errors.will_result_in_text ?
          <div className="small text-danger">
            Please enter a response of 140 characters or less
          </div>
        : null}

        <div className="text-right mb-4">
          <CharacterCounter
            inputString={willResultInText}
            maxChars={140}
            onExceed={(isExceeded) => setWillResultInTextCharCountExceeded(isExceeded)}
          />
        </div>

        <textarea
          onChange={(event) => setSucceededWhenText(event.target.value)}
          value={succeededWhenText}
          ref={register({ required: true, maxLength: 140 })}
          name="succeeded_when_text"
          className={cn("form-control mb-1", succeededWhenTextCharCountExceeded ? 'bg-scary' : null)}
          placeholder="We will know we have succeeded when <we see this measurable signal>..."
        />

        {errors.succeeded_when_text ?
          <div className="small text-danger">
            Please enter a response of 140 characters or less
          </div>
        : null}

        <div className="text-right mb-2">
          <CharacterCounter
            inputString={succeededWhenText}
            maxChars={140}
            onExceed={(isExceeded) => setSucceededWhenTextCharCountExceeded(isExceeded)}
          />
        </div>

        <div>
          <Button
            type="submit"
            text={hypothesis === null ? "Submit" : "Update"}
            className="btn btn-primary px-5 rounded"
            disabled={weBelieveText.length === 0 || willResultInText.length === 0 || succeededWhenText.length === 0}
            loading={isLoading}
          />
        </div>
      </form>

      <ProTip
        mainText={
          <React.Fragment>
            <p>
              Be mindful of:
            </p>

            <p>
              <strong>Feasibility risk</strong> - whether the team can build what we need within the time allotted for the experiment.
            </p>

            <p>
              If applicable to your MVP, be mindful of:
            </p>

            <p>
              <strong>Usability risk</strong> - whether users can figure out how to use it as intended.
            </p>
          </React.Fragment>
        }
        calloutText={
          <React.Fragment>
            <div>
              <strong>We believe</strong> &lt;putting up 8 mirrors&gt; <strong>will result in</strong> &lt;residents being less annoyed by the wait&gt;. <strong>We will know we have succeeded when</strong> &lt;we get 50% fewer complaints&gt;.
            </div>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}

export default Hypothesis;
