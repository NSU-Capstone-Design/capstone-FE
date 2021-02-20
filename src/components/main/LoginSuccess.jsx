import React from 'react';
import { useDispatch } from 'react-redux';
import { test } from '../../api/account';
import Header from '../Header';

const LoginSuccess = () => {
  return (
    <div>
      <div>로그인 성공</div>
      <Header />
      <button onClick={test}>test</button>
    </div>
  );
};

export default LoginSuccess;
