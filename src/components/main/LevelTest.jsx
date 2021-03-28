import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { getLTP } from '../../reducers/account/levelTestProbs';
import { useDispatch, useSelector } from 'react-redux';
import CodeMirror from '../CodeMirror';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  contentWrap: {
    display: 'flex',
    height: 'calc(100vh - 144px)',
  },
  left: {
    width: '50%',
    overflow: 'scroll',
    margin: '10px',
  },
  right: {
    width: '50%',
    overflow: 'scroll',
  },
  head1: {
    fontWeight: '700',
    margin: '5px 3px',
  },
  ioWrap: {
    display: 'inline-block',
    width: '50%',
  },
}));

function getSteps(step) {
  return step;
}

export default function HorizontalNonLinearStepper() {
  const levelTestProblemsList = useSelector(
    (state) => state.levelTestProbs.probs
  );
  console.log(levelTestProblemsList);
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(await getLTP());
  }, []);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps(levelTestProblemsList);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const copy = (e, id) => {
    var tempElem = document.createElement('textarea');
    tempElem.value = document.getElementById(id).innerText;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand('copy');
    document.body.removeChild(tempElem);
  };
  return (
    <div className={classes.root}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{ padding: '12px', overflow: 'hidden' }}
      >
        {steps.map((probs, index) => (
          <Step key={probs.number}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              {probs.problem.level} {probs.problem.title}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className={classes.contentWrap}>
        <div className={classes.left}>
          {allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <div className={classes.head1}>문제</div>
              <Typography className={classes.instructions}>
                {levelTestProblemsList[activeStep].problem.problem_content}
              </Typography>
              <div className={classes.head1}>입력</div>
              <Typography className={classes.instructions}>
                {levelTestProblemsList[activeStep].problem.problem_input}
              </Typography>
              <div className={classes.head1}>출력</div>
              <Typography className={classes.instructions}>
                {levelTestProblemsList[activeStep].problem.problem_output}
              </Typography>
              {levelTestProblemsList[activeStep].problem.ioexam_set.map(
                (ioexam, index) => {
                  return (
                    <div className={classes.ioWrap}>
                      <div className={classes.head1}>
                        {ioexam.is_input ? '입력 예제' : '출력 예제'}{' '}
                        <span
                          style={{
                            fontWeight: 500,
                            color: '#10a0ff',
                            cursor: 'pointer',
                          }}
                          onClick={(e) => {
                            copy(e, `io${activeStep}${index}`);
                          }}
                        >
                          복사
                        </span>
                      </div>
                      <pre
                        id={`io${activeStep}${index}`}
                        style={{
                          overflowX: 'scroll',
                          width: '95%',
                          margin: '3px 5px',
                        }}
                      >
                        {ioexam.value}
                      </pre>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
        <div className={classes.right}>
          <CodeMirror />
        </div>
      </div>
      <div>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          Next
        </Button>
        {activeStep !== steps.length &&
          (completed[activeStep] ? (
            <Typography variant="caption" className={classes.completed}>
              Step {activeStep + 1} already completed
            </Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleComplete}
            >
              {completedSteps() === totalSteps() - 1
                ? 'Finish'
                : 'Complete Step'}
            </Button>
          ))}
      </div>
    </div>
  );
}
