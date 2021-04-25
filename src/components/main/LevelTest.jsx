import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import IOExam from './IOExam';
import { createLevel } from '../../api/levelTest';
import { getLevel } from '../../reducers/account/level';
// import ModalEvent  from '../others/ModalEvent';

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
    height: 'calc(100vh - 160px)',
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
    console.log(levelTestProblemsList, 'second');

    levelTestProblemsList.map((prob, key) => {
      if (prob.evaluation !== '-') {
        const newCompleted = completed;
        newCompleted[prob.number - 1] = true;
        console.log(newCompleted, 'newComp');
        setCompleted(newCompleted);
      } else {
        if (firstActiveIdx > key) {
          firstActiveIdx = key;
        }
      }
    });
    console.log(completed);
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
    return completedSteps() === totalSteps() - 1;
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
  const ioExamZip = (ioExams) => {
    const ioExamList = [];
    let ioExamSet = {
      input: {},
      output: {},
    };
    for (let io of ioExams) {
      if (io.is_input) {
        ioExamSet.input = io;
      } else {
        ioExamSet.output = io;
      }
      if (ioExamSet.input.io_num === ioExamSet.output.io_num) {
        ioExamList.push(ioExamSet);
        ioExamSet = {
          input: {},
          output: {},
        };
      }
    }
    return ioExamList;
  };
  const copy = (e, id) => {
    var tempElem = document.createElement('textarea');
    tempElem.value = document.getElementById(id).innerText;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand('copy');
    document.body.removeChild(tempElem);
  };
  const saveScore = async () => {
    await createLevel();
    dispatch(getLevel());
  };
  return (
    <div className={classes.root}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{
          padding: '12px',
          overflowX: 'scroll',
          overflowY: 'hidden',
          boxSizing: 'content-box',
        }}
      >
        {levelTestProblemsList.map((probs, index) => {
          if (index === levelTestProblemsList.length - 1) {
            return (
              <Step key={index + 1} id={index}>
                <StepButton
                  onClick={handleStep(index)}
                  completed={completed[index]}
                  style={{ width: '100px', padding: '5px' }}
                >
                  최종 안내
                </StepButton>
              </Step>
            );
          } else {
            return (
              <Step key={index + 1} id={index}>
                <StepButton
                  onClick={handleStep(index)}
                  completed={completed[index]}
                  style={{ width: '100px' }}
                >
                  {probs.problem.title}
                </StepButton>
              </Step>
            );
          }
        })}
      </Stepper>
      <div className={classes.contentWrap}>
        <div className={classes.left}>
          {levelTestProblemsList[activeStep] !== undefined ? (
            levelTestProblemsList[activeStep].id !== 'notice' ? (
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

                {ioExamZip(
                  levelTestProblemsList[activeStep].problem.ioexam_set
                ).map((ioexam, index) => (
                  <IOExam
                    ioexam={ioexam}
                    copy={copy}
                    activeStep={activeStep}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  다음 단계로 넘어가면 테스트가 완전히 종료됩니다. 평가 수정이
                  필요한경우 지금 다시한번 확인 해 주세요.
                </Typography>
                <Button
                  disabled={completedSteps() !== totalSteps() - 1}
                  color="primary"
                  variant="contained"
                  onClick={saveScore}
                >
                  문제 풀러 가기
                </Button>
              </div>
            )
          ) : (
            <></>
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
          disabled={activeStep === totalSteps() - 1}
        >
          Next
        </Button>
        {activeStep !== levelTestProblemsList.length - 1 ? (
          activeStep !== levelTestProblemsList.length &&
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
              문제 평가하기
            </Button>
          ))
        ) : (
          <></>
        )}
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
