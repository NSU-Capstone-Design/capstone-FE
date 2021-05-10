import React, { useState, useEffect } from 'react';
import { check_token } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { getProbApi, getProblem } from '../api/problem';
import { Button, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import CodeMirror from '../components/CodeMirror';
import Typography from '@material-ui/core/Typography';
import IOExam from '../components/main/IOExam';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100vw',
    height: 'calc(100vh - 60px)',
    marginTop: '60px',
    position: 'fixed',
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
  contentBody: {
    width: '100%',
    height: 'calc(100vh - 130px)',
    overflowY: 'scroll',
    margin: '10px',
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
  contentFooter: {
    width: '100%',
    height: '50px',
    boxShadow: '0px 6px 33px 8px rgba(135,135,135,1)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
}));
const ProblemDetail = ({ match }) => {
  const loginState = useSelector((state) => state.account.status);

  const dispatch = useDispatch();
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    } else {
      console.log('로그인 창으로'); // 또는 에러 안내
    }
  }, []);
  const classes = useStyles();

  const ioExamZip = (ioExams) => {
    const ioExamList = [];
    let ioExamSet = {
      input: {},
      output: {},
    };
    console.log('ioexams', ioExams);
    let map = new Map();
    ioExams &&
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

  const [probd, setProbd] = useState([]);
  const { prob_num } = match.params;
  console.log({ prob_num });

  useEffect(async () => {
    // console.log('prob detailpage', probd);
    const prob = await getProbApi(prob_num);
    setProbd(prob);
  }, []);

  return (
    <>
      <Header loginState={loginState} />
      <div className={classes.container}>
        <div className={classes.contentBox}>
          <>
            <div className={classes.contentBody}>
              <h1 className={classes.title}>{probd.title}</h1>
              <h3 className={classes.probLevel}>LEVEL:{probd.level}</h3>
              <table style={{ margin: '20px 0px' }}>
                <thead>
                  <tr>
                    <th style={{ width: '100px' }}>시간 제한</th>
                    <th style={{ width: '100px' }}>메모리 제한</th>
                    <th style={{ width: '100px' }}>제출</th>
                    <th style={{ width: '100px' }}>정답</th>
                    <th style={{ width: '100px' }}>맞은 사람</th>
                    <th style={{ width: '100px' }}>정답 비율</th>
                  </tr>
                </thead>
                <tbody className={classes.tbody}>
                  <tr>
                    <td>{probd.timeout} </td>
                    <td>{probd.memory_limit} </td>
                    <td>{probd.submission} </td>
                    <td>{probd.correct} </td>
                    <td>{probd.correct_people} </td>
                    <td>{probd.correct_answer_rate} </td>
                  </tr>
                </tbody>
              </table>
              <div className={classes.head}>문제</div>
              <Typography className={classes.instructions}>
                {probd.problem_content}
              </Typography>
              <div className={classes.head}>입력</div>
              <Typography className={classes.instructions}>
                {probd.problem_input}
              </Typography>
              <div className={classes.head}>출력</div>
              <Typography className={classes.instructions}>
                {probd.problem_output}
              </Typography>

              {ioExamZip(probd.ioexam_set).map((ioexam, index) => (
                <IOExam ioexam={ioexam} copy={copy} index={index} />
              ))}
            </div>
            <div className={classes.contentFooter}>
              <span>
                <a
                  href={`https://www.acmicpc.net/submit/${probd.prob_num}`}
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
                  href={`https://www.google.com/search?q=BOJ+${probd.prob_num}%EB%B2%88+%ED%92%80%EC%9D%B4`}
                  target="_blank"
                >
                  <Button color="primary" variant="contained">
                    문제 풀이
                  </Button>
                </a>
              </span>
            </div>
          </>
          )
        </div>
        <div className={classes.codeBox}>
          <CodeMirror />
        </div>
      </div>
    </>
  );
};

export default ProblemDetail;
