import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { check_token } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';

const useStyles = makeStyles({});

const Search = () => {
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
  return (
    <>
      <Header loginState={loginState} />
      <div>문제 검색하기</div>
    </>
  );
};

export default Search;
