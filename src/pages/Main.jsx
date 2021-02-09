import React from 'react';
import { makeStyles } from '@material-ui/core';
import LoginBox from '../containers/account/LoginBox';
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

const Main = () => {
  const classes = useStyle();
  return (
    <div className={classes.mainContainer}>
      <div>메인페이지</div>
      <LoginBox />
      <div>---------------------</div>
      <div>-------회원가입--------</div>
      <div>---------------------</div>
      <SignUpBox />
    </div>
  );
};

export default Main;
