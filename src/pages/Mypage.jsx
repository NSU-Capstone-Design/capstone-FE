import React, { useEffect, useState } from 'react';
import { myInfo } from '../api/account';
import Header from '../components/Header';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  mypageWrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  mypageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '1024px',
  },
});

const Mypage = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    user_id: '',
    nickname: '',
    level: '',
    expert_user: false,
  });
  const classes = useStyles();
  useEffect(async () => {
    const data = await myInfo();
    console.log(data);
    setUserInfo(data);
  }, []);
  const testHandler = () => {
    myInfo();
  };
  return (
    <>
      <Header />
      <div className={classes.mypageWrap}>
        <div className={classes.mypageContainer}>
          <div>기본정보 가져오기</div>
          <div>user_id : {userInfo.user_id}</div>
          <div>nicknamae : {userInfo.nickname}</div>
          <div>email : {userInfo.email}</div>
          <div></div>
          <button onClick={testHandler}>test</button>
        </div>
      </div>
    </>
  );
};

export default Mypage;
