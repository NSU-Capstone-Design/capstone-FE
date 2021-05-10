import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import { getUserLevelProb } from '../../reducers/userLevelProb';
import CodeMirror from '../../components/CodeMirror';
import Typography from '@material-ui/core/Typography';
import useModalEvent from '../../hooks/useModalEvent';
import IOExam from './IOExam';
import ProbEvaluate from './ProbEvaluate';
import LoadingSpinner from '../others/LoadingSpinner';
import ChangeLevel from './ChangeLevel';
import { increaseLevelApi } from '../../api/problem';

const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100vw',
    height: 'calc(100vh - 60px)',
  },
  contentBox: {
    width: '50vw',
    height: 'calc(100vh - 60px)',
  },
  codeBox: {
    width: '50vw',
    height: 'calc(100vh - 60px)',
  },
  head: {
    fontWeight: 700,
    fontSize: '20px',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  contentBody: {
    width: '100%',
    height: 'calc(100vh - 130px)',
    overflowY: 'scroll',
    margin: '10px',
  },
  contentFooter: {
    width: '100%',
    height: '50px',
    boxShadow: '0px 6px 33px 8px rgba(135,135,135,1)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  tbody: {
    '& td': {
      padding: '8px',
      lineHeight: '1.42857143',
      verticalAlign: 'top',
      borderTop: '1px solid #ddd',
      textAlign: 'center',
    },
  },
}));
const ioExamZip = (ioExams = []) => {
  const ioExamList = [];
  let ioExamSet = {
    input: {},
    output: {},
  };
  console.log('ioexams', ioExams);
  let map = new Map();
  ioExams.map((io, key) => {
    map.set(key, io);
  });
  for (let io of map.keys()) {
    if (ioExams[io].is_input) {
      ioExamSet.input = ioExams[io];
    } else {
      ioExamSet.output = ioExams[io];
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
export default function () {
  const classes = useStyle();
  // const [problem, setProblem] = useState({
  //   correct: '',
  //   correct_answer_rate: '',
  //   correct_people: '',
  //   ioexam_set: [],
  //   level: 0,
  //   memory_limit: '',
  //   prob_num: 0,
  //   problem_content: '',
  //   problem_input: '',
  //   problem_output: '',
  //   submission: '',
  //   timeout: '',
  //   title: '',
  // });
  const [modalState, setModalstate, open, close, ModalEvent] = useModalEvent(
    false
  );
  const [
    modalState2,
    setModalstate2,
    open2,
    close2,
    ModalEvent2,
  ] = useModalEvent(false);
  const { loading, problem, error, next, level } = useSelector(
    (state) => state.userLevelProb
  );
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getUserLevelProb());
    // setProblem(prob);
  }, []);
  const changeLevel = () => {
    open2();
  };
  const nextProb = () => {
    open();
  };
  const increase = async () => {
    const redirect = await increaseLevelApi();
    if (redirect) {
      close();
      dispatch(getUserLevelProb());
    } else {
      alert('서버에 장애가 있습니다. 잠시후 다시 시도해 주세요.');
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.contentBox}>
        {loading ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoadingSpinner />
          </div>
        ) : next ? (
          <div style={{ margin: '20px' }}>
            <h2>
              현재 레벨<strong>({level})</strong>에 모든 문제를 완료하였습니다.
            </h2>
            <p>
              다른 레벨의 문제를 추가적으로 확인하고 싶으시거나 풀이가 완료된
              문제확인을 원하시면 "문제찾기" 탭 또는 마이페이지를 이용해 주세요.
            </p>
            <Button color="secondary" variant="contained" onClick={increase}>
              다음 레벨로
            </Button>
          </div>
        ) : (
          <>
            <div className={classes.contentBody}>
              <table style={{ margin: '20px 0px' }}>
                <thead>
                  <tr>
                    <th style={{ width: '100px' }}>시간 제한</th>
                    <th style={{ width: '100px' }}>메모리 제한</th>
                  </tr>
                </thead>
                <tbody className={classes.tbody}>
                  <tr>
                    <td>{problem.timeout} </td>
                    <td>{problem.memory_limit} </td>
                  </tr>
                </tbody>
              </table>
              <h2 className={classes.title}>{problem.title}</h2>
              <div className={classes.head}>문제</div>
              <Typography
                dangerouslySetInnerHTML={{ __html: problem.problem_contents }}
                className={classes.instructions}
              ></Typography>
              <div className={classes.head}>입력</div>
              <Typography
                dangerouslySetInnerHTML={{ __html: problem.problem_input }}
                className={classes.instructions}
              ></Typography>
              <div className={classes.head}>출력</div>
              <Typography
                dangerouslySetInnerHTML={{ __html: problem.problem_output }}
                className={classes.instructions}
              ></Typography>

              {ioExamZip(problem.ioexam_set).map((ioexam, index) => (
                <IOExam ioexam={ioexam} copy={copy} index={index} />
              ))}
            </div>
            <div className={classes.contentFooter}>
              <span>
                <a
                  href={`https://www.acmicpc.net/submit/${problem.prob_num}`}
                  target="_blank"
                >
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: '10px' }}
                  >
                    BOJ에서 상세 체점
                  </Button>
                </a>
                <a
                  href={`https://www.google.com/search?q=BOJ+${problem.prob_num}%EB%B2%88+%ED%92%80%EC%9D%B4`}
                  target="_blank"
                >
                  <Button color="primary" variant="contained">
                    문제 풀이
                  </Button>
                </a>
              </span>
              <span>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ margin: '10px' }}
                  onClick={changeLevel}
                >
                  난이도 변환
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ margin: '10px' }}
                  onClick={nextProb}
                >
                  다음 문제로
                </Button>
                <ModalEvent state={modalState} close={close}>
                  <ProbEvaluate close={close} prob_id={problem.prob_num} />
                </ModalEvent>
                <ModalEvent2 state={modalState2} close={close2}>
                  <ChangeLevel close={close2} prob_level={problem.level} />
                </ModalEvent2>
              </span>
            </div>
          </>
        )}
      </div>
      <div className={classes.codeBox}>
        <CodeMirror />
      </div>
    </div>
  );
}
