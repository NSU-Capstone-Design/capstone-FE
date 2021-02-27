import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';

const useStyles = makeStyles({});

const Question = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div>질문 게시판 리스트</div>
    </>
  );
};

export default Question;
