import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import CodeMirror from '../components/CodeMirror';
import { check_token } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { getProblem } from '../api/problem';

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

const ProblemDetail = () => {
  const [problem, setProblem] = useState({});
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
  return (
    <>
      <Header />
      <div className={classes.container}>
        <div className={classes.contentBox}>문제 내용들 입력</div>
        <div className={classes.codeBox}>
          <CodeMirror />
        </div>
      </div>
    </>
  );
};

export default ProblemDetail;
