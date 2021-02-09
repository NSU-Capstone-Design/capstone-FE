import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../reducers/account';

const LoginBox = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const idInputHandler = (e) => setId(e.target.value);
  const pwInputHandler = (e) => setPassword(e.target.value);
  const loginHandler = () => {
    const data = {
      user_id: id,
      password: password,
    };
    dispatch(login(data));
  };
  return (
    <div>
      <label htmlFor="id">id : </label>
      <input type="text" id="id" value={id} onChange={idInputHandler} />
      <label htmlFor="pw">pw : </label>
      <input
        type="password"
        id="pw"
        value={password}
        onChange={pwInputHandler}
      />
      <div>
        <button onClick={loginHandler}>login</button>
      </div>
    </div>
  );
};

export default LoginBox;
