import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import CodeMirror from '../components/CodeMirror';

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
