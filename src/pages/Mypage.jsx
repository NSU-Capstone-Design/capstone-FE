import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { myInfo } from '../api/account';
import Header from '../components/Header';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    user_id: '',
    nickname: '',
    level: '',
    expert_user: false,
  });
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
      <div>
        <div>기본정보 가져오기</div>
        <div>user_id : {userInfo.user_id}</div>
        <div>nicknamae : {userInfo.nickname}</div>
        <div>email : {userInfo.email}</div>
        <div></div>
        <button onClick={testHandler}>test</button>
      </div>
    </>
  );
};

export default Mypage;
