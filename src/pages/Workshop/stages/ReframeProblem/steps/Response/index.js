import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';
import ProTip from 'library/ProTip';
import InfoTip from 'library/InfoTip';
import TextArea from 'library/TextArea';

import * as reframeProblemActions from 'app/workshop/stages/reframe_problem/actions';
import * as votingActions from 'app/voting/actions';

const Response = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control, setValue } = useForm();

  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [responseText, setResponseText] = React.useState("");

  React.useEffect(() => {
    dispatch(votingActions.calculateVotingResults(params.workshop_token, "ProblemResponse"));
  }, [dispatch, params.workshop_token]);

  // Get my response on page load for editing and validation purposes
  React.useEffect(() => {
    dispatch(reframeProblemActions.getMyResponse(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const onSubmit = (formData) => {
    if (myReframeProblemResponse === null) {
      dispatch(
        reframeProblemActions
        .saveResponse(
          params.workshop_token,
          formData.response_text
        )
      )
      .then(() => {
        setResponseText("");
      });
    } else {
      dispatch(
        reframeProblemActions
        .updateResponse(
          params.workshop_token,
          myReframeProblemResponse.id,
          formData.response_text
        )
      )
      .then(() => {
        setResponseText("");
      });
    }
  }

  const handleExceed = (isExceeded) => {
    setCharCountExceeded(isExceeded);
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("SAVE_REFRAME_PROBLEM_RESPONSE") >= 0;
  });

  const myReframeProblemResponse = useSelector((state) => {
    return state.ReframeProblem.myReframeProblemResponse;
  });

  const starVotingResults = useSelector((state) => {
    return state.Voting.starVotingResults["ProblemResponse"];
  });

  React.useEffect(() => {
    if (myReframeProblemResponse) {
      setResponseText(myReframeProblemResponse.response_text);
      setValue("response_text", myReframeProblemResponse.response_text);
    } else {
      setResponseText("");
      setValue("response_text", "");
    }
  }, [myReframeProblemResponse, setValue]);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5 mb-5">Reframe Problem</h1>

      {starVotingResults && starVotingResults.runoff_winner ?
        <blockquote className="mb-5">
          <div className="text-muted small">
            Problem to Reframe:
          </div>

          <div>
            {starVotingResults.runoff_winner.resource.response_text}
          </div>
        </blockquote>
      : null}

      <div className="mb-5">
        Ask yourself and answer the question, "so what?" as it relates to the problem (you get one response).
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          control={control}
          register={register({ required: true, maxLength: 140 })}
          name="response_text"
          placeholder="What is one other way to understand this problem?"
          className={cn("mb-1", charCountExceeded ? 'bg-scary' : '')}
          onUserInput={(userInput) => setResponseText(userInput)}
        />

        {errors.response_text ?
          <div className="small text-danger">
            Please enter a response of 140 characters or less
          </div>
        : null}

        <div className="text-right">
          <CharacterCounter
            inputString={responseText}
            maxChars={140}
            onExceed={handleExceed}
          />
        </div>

        <div>
          <Button
            type="submit"
            text={myReframeProblemResponse === null ? "Submit" : "Update"}
            className="btn btn-primary px-5 rounded"
            disabled={responseText.length === 0}
            loading={isLoading}
          />
        </div>
      </form>

      <InfoTip
        styles={{
          position: "absolute",
          bottom: "5rem",
          left: "3rem"
        }}
        title="Historical Example"
        text={
          <React.Fragment>
            <p>
              In the 1950s, shipping goods by air was on the cusp of overtaking shipping goods by sea. This was because engineers could not come up with a way to make boat travel faster. They tried inventing faster boats, creating shorter routes, limiting the size of ship crews, and more. But nothing worked out. One truck driver saw the problem from a new frame of reference. He noticed the inefficiency of unloading and loading his truck onto the ship one item at a time. He proposed a solution that no engineer could see: If you take the back of my truck off and load it onto the ship you will decrease shipping times.
            </p>

            <p>
              Voilà! Containerization was born.
            </p>

            <p>
              The problem was that engineers asked the question: "How might we make boats faster?" This question, however, would have never led to containerization because it presupposes that the problem is with the speed of the boat. What they should have asked was: "How might we make the entire shipping process faster?" Coming up with the right question is not always easy. What we have to do is something called reframing the problem.
            </p>

            <p>
              When one sees a problem, e.g., boats are too slow, one should ask the question: <strong>"So what?" Problem answer: "Longer transport time cost us more money."</strong> Instead of leading to the search for faster boats, this question leads one to another, namely: "How might we decrease transport time?" or "What else can we do to decrease transport time?" This reframing might generate the insight that, in turn, renders the solution of containerization.
            </p>

            <p>
              Thus, the problem to solve was not simply to increase nautical speed from point A to B simply because 99.9% of the journey is over water but rather the issue was that ships were docked too long due to the unloaded of trucks and reloading of those goods into the ships. Problem reframing saved the maritime transport industry not by innovating in the 99.9% but by looking at what others overlooked. Namely, the 0.1% of the process.
            </p>
          </React.Fragment>
        }
      />

      <ProTip
        mainText="Think deeply about what it would do for you if you solved the problem and why that would matter."
        calloutText="Waiting for the elevators is annoying."
      />
    </React.Fragment>
  );
}

export default Response;
