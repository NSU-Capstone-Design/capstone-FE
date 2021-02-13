import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../reducers/account/login';

const LoginBox = ({ status }) => {
  const [id, setId] = useState('admin');
  const [password, setPassword] = useState('sm46564323');
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state);
  const idInputHandler = (e) => setId(e.target.value);
  const pwInputHandler = (e) => setPassword(e.target.value);
  const loginHandler = () => {
    const data = {
      user_id: id,
      password: password,
    };
    dispatch(login(data));
  };
  const check = () => {
    console.log(user_id);
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
        <span>{status}</span>
      </div>
      <div>
        <button onClick={check}>check</button>
      </div>
    </div>
  );
};

export default LoginBox;
