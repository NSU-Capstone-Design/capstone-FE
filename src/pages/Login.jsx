import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import LoginBox from '../containers/account/LoginBox';
import SignUpBox from '../containers/account/SingUpBox';
import { useSelector, useDispatch } from 'react-redux';
import { logout, success_check } from '../reducers/account/authenticate';
import { check_token } from '../api/account';
import LoginSuccess from '../components/main/LoginSuccess';
import { Redirect } from 'react-router-dom';

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
  const loginState = useSelector((state) => state.account.status);

  if (loginState === 'success') {
    return <Redirect to="/main" />;
  } else {
    return (
      <div className={classes.mainContainer}>
        <div>Login</div>
        <LoginBox status={loginState} />
      </div>
    );
  }
};

export default Login;
