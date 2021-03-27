import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../reducers/account/authenticate';

const LoginBox = ({ status }) => {
  const [id, setId] = useState('admin');
  const [password, setPassword] = useState('sm46564323');
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
        <span>{status}</span>
      </div>
      <div>
        아직 회원이 아니시라구요? <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginBox;
