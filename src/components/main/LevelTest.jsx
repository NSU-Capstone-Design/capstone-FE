import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getLTP } from '../../reducers/account/levelTestProbs';
import { useDispatch, useSelector } from 'react-redux';
import CodeMirror from '../CodeMirror';
import useModalEvent from '../../hooks/useModalEvent';
import LevelTestSurvey from './LevelTestSurvey';
// import ModalEvent from '../others/ModalEvent';

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

export default function HorizontalNonLinearStepper() {
  const levelTestProblemsList = useSelector(
    (state) => state.levelTestProbs.probs
  );
  console.log(levelTestProblemsList);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0); // 현재 화면에 활성중인 스텝의 인덱스
  const [completed, setCompleted] = useState({}); // 객체 형식으로, 키에는 step 인덱스, 값은 boolean으로, 완료는 T 미완은 F
  const [
    completedModal,
    setCompletedModal,
    open,
    close,
    ModalEvent,
  ] = useModalEvent(false);

  useEffect(async () => {
    dispatch(await getLTP());
  }, []);
  useEffect(() => {
    let firstActiveIdx = levelTestProblemsList.length;
    levelTestProblemsList.map((prob) => {
      console.log('hi');
      if (prob.evaluation !== '-') {
        const newCompleted = completed;
        newCompleted[prob.number - 1] = true;
        setCompleted(newCompleted);
      } else {
        console.log(prob.number, 'prob.number');
        if (firstActiveIdx > prob.number - 1) {
          firstActiveIdx = prob.number - 1;
        }
      }
    });
    console.log(firstActiveIdx, '9999');
    setActiveStep(firstActiveIdx);
  }, [levelTestProblemsList]);
  const classes = useStyles();

  const totalSteps = () => {
    return levelTestProblemsList.length;
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
          levelTestProblemsList.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  // 완료 버튼 누를시 동작
  const handleComplete = () => {
    // 완료 상태로 변경
    // const newCompleted = completed;
    // newCompleted[activeStep] = true;
    // setCompleted(newCompleted);

    // 모달 창 띄우기 그리고 모달창에서 평가하기 그리고 아래 함수
    open();
    // handleNext();
  };

  const copy = (e, id) => {
    var tempElem = document.createElement('textarea');
    tempElem.value = document.getElementById(id).innerText;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand('copy');
    document.body.removeChild(tempElem);
  };
  const saveScore = () => {};
  return (
    <div className={classes.root}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{ padding: '12px', overflow: 'hidden' }}
      >
        {levelTestProblemsList.map((probs, index) => (
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
              <Button onClick={saveScore}>문제 풀러 가기</Button>
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
                          width: '90%',
                          height: '30px',
                          margin: '3px 5px',
                          padding: '10px',
                          border: '1px solid #a9a9a9',
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
        {activeStep !== levelTestProblemsList.length &&
          (completed[activeStep] ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleComplete}
            >
              평가 수정
            </Button>
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
        <ModalEvent state={completedModal} close={close}>
          <LevelTestSurvey
            close={close}
            ltpl={levelTestProblemsList}
            activeStep={activeStep}
          />
        </ModalEvent>
      </div>
    </div>
  );
}
