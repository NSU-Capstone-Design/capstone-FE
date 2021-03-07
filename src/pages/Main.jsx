import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import LoginBox from '../containers/account/LoginBox';
import SignUpBox from '../containers/account/SingUpBox';
import { useSelector, useDispatch } from 'react-redux';
import { logout, success_check } from '../reducers/account/authenticate';
import { check_token } from '../api/account';
import LoginSuccess from '../components/main/LoginSuccess';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const useStyle = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '1024px',
    height: '100vh',
  },
});

const Main = () => {
  const classes = useStyle();
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
  console.log(loginState);
  if (loginState === 'success') {
    return (
      <>
        <Header />
        <LoginSuccess />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className={classes.mainContainer}>
          <div>메인페이지</div>
          <div>지금 바로 서비스를 시작해 보아요!</div>
          <Link to="/login">지금 시작하기!</Link>
        </div>
      </>
    );
  }
};

export default Main;
