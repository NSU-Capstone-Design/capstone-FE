import React, { useEffect, useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { check_token } from '../api/account';
import LoginSuccess from '../components/main/LoginSuccess';
import Index from '../components/main/Index';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { FRONT_BASE_URL } from '../api/account';

const useStyle = makeStyles({
  mainContainer: {
    marginTop: '60px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
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
    }
  }, []);
  console.log('mainpage : ' + loginState);
  if (loginState === 'success') {
    return (
      <>
        <Header loginState={loginState} />
        <div className={classes.mainContainer}>
          <LoginSuccess />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className={classes.mainContainer}>
          <Index />
        </div>
      </>
    );
  }
};

export default Main;
