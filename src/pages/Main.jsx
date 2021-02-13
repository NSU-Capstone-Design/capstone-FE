import React from 'react';
import { makeStyles } from '@material-ui/core';
import LoginBox from '../containers/account/LoginBox';
import SignUpBox from '../containers/account/SingUpBox';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/account/login';

const useStyle = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
});

const Main = () => {
  const classes = useStyle();
  const loginState = useSelector((state) => state.account.status);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    window.localStorage.removeItem('token');
    dispatch(logout());
  };
  console.log(loginState);
  if (loginState === 'success') {
    return (
      <div>
        <div>로그인 성공</div>
        <button onClick={logoutHandler}>logout</button>
      </div>
    );
  } else {
    return (
      <div className={classes.mainContainer}>
        <div>메인페이지</div>
        <LoginBox status={loginState} />
        <div>---------------------</div>
        <div>-------회원가입--------</div>
        <div>---------------------</div>
        <SignUpBox />
      </div>
    );
  }
};

export default Main;
