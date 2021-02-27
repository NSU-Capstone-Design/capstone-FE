import React from 'react';
import { useDispatch } from 'react-redux';
import { test } from '../../api/account';
import Header from '../Header';

const LoginSuccess = () => {
  return (
    <div>
      <button onClick={test}>로그인 성공 페이지</button>
    </div>
  );
};

export default LoginSuccess;
