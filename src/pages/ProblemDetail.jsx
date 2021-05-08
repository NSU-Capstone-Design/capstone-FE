import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import CodeMirror from '../components/CodeMirror';
import { check_token } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { getProblem } from '../api/problem';
import { baseApi } from '../api/axiosApi';

const useStyles = makeStyles({
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
});

const ProblemDetail = ({ history, location, match }) => {
  const loginState = useSelector((state) => state.account.status);

  const dispatch = useDispatch();
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    } else {
      console.log('로그인 창으로'); // 또는 에러 안내
    }
    const data = await getProblem();
  }, []);
  const classes = useStyles();

  const [probd, setProbd] = useState([]);
  const { prob_num } = match.params;
  console.log({ prob_num });

  useEffect(async () => {
    let datas;
    await baseApi.get(`/problem/${prob_num}`).then((res) => {
      console.log(res);
      datas = res.datas;
    });
    return datas;
  });

  return (
    <>
      <div className={classes.container}>
        <div className={classes.contentBox}>
          {probd.map((probds) => (
            <div key={probds.id}>
              <div className="problemHeader">
                <span className="problemTitle">{probds.title}</span>
                <span className="problemLevel">{probds.level}</span>
              </div>
              <div className="problemInfo">
                <table id="problem-info">
                  <thead>
                    <tr>
                      <th>시간 제한</th>
                      <th>메모리 제한</th>
                      <th>제출</th>
                      <th>정답</th>
                      <th>맞은 사람</th>
                      <th>정답 비율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{probds.timeout}</td>
                      <td>{probds.memory_limit}</td>
                      <td>{probds.submission}</td>
                      <td>{probds.correct}</td>
                      <td>{probds.correct_people}</td>
                      <td>{probds.correct_answer_rate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="problemDescription">
                <div className="headline">문제</div>
                <div className="problemContent">{probds.problem_content}</div>
              </div>
              <div className="input">
                <div className="headline">입력</div>
                <div className="problemInput">{probds.problem_input}</div>
              </div>
              <div className="output">
                <div className="headline">출력</div>
                <div className="problemOutput">{probds.problem_output}</div>
              </div>
              <div className="IOExam">
                <div className="sampleInput">
                  <div className="headline">예제 입력</div>
                  <div className="sampleData"></div>
                </div>
                <div className="sampleOutput">
                  <div className="headline">예제 출력</div>
                  <div className="sampledata"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.codeBox}>
          <CodeMirror />
        </div>
      </div>
    </>
  );
};

export default ProblemDetail;
