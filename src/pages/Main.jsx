import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import LoginBox from '../containers/account/LoginBox';
import SignUpBox from '../containers/account/SingUpBox';
import { useSelector, useDispatch } from 'react-redux';
import { logout, success_check } from '../reducers/account/authenticate';
import { check_token } from '../api/account';
import LoginSuccess from '../components/main/LoginSuccess';

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
    return <LoginSuccess />;
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
