import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import LoginBox from '../containers/account/LoginBox';
import { useSelector, useDispatch } from 'react-redux';
import { check_token } from '../api/account';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

const useStyle = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#eeeeee',
  },
  bodyWrap: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '75vh',
    borderRadius: '25px',
    marginTop: '100px',
    boxShadow: '3px 3px 3px #9a9a9a',
  },
  bodyContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '75%',
    width: 'calc(100% - 50px)',
  },
  tmp: {
    width: '50%',
    height: '13%',
    margin: '25px',
    marginBottom: 0,
  },
});

const Login = () => {
  const classes = useStyle();
  const loginRes = useSelector((state) => state.account.status);
  const dispatch = useDispatch();
  const [loginState, setLoginState] = useState('fail');
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      setLoginState('success');
    }
    dispatch({
      type: 'initial',
    });
  }, []);
  if (loginState === 'success' || loginRes === 'success') {
    return <Redirect to="/main" />;
  } else {
    return (
      <>
        <Header />
        <div className={classes.mainContainer}>
          <div className={classes.bodyWrap}>
            <div className={classes.bodyContainer}>
              <img className={classes.tmp} src="/static/logo.png" alt="" />
              <LoginBox status={loginRes} />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Login;
