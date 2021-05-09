import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { check_token } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';

const useStyles = makeStyles({});

const QuestionDetail = () => {
  const loginState = useSelector((state) => state.account.status);
  const classes = useStyles();

  return (
    <>
      <Header loginState={loginState} />
      <div>질문 게시판 리스트</div>
    </>
  );
};

export default QuestionDetail;
