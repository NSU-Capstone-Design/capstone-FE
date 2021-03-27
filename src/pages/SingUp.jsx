import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import LoginBox from '../containers/account/LoginBox';
import { useSelector } from 'react-redux';
import { check_token } from '../api/account';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SignUpBox from '../containers/account/SingUpBox';

const useStyle = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
});

const Login = () => {
  const classes = useStyle();
  const loginRes = useSelector((state) => state.account.status);
  const [loginState, setLoginState] = useState('fail');
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      setLoginState('success');
    }
  }, []);
  if (loginState === 'success' || loginRes === 'success') {
    return <Redirect to="/main" />;
  } else {
    return (
      <>
        <Header />
        <div className={classes.mainContainer}>
          <div>회원가입</div>
          <SignUpBox />
        </div>
      </>
    );
  }
};

export default Login;
