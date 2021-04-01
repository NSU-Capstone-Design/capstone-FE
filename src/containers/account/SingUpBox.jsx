import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sign_up } from '../../reducers/account/signUp';

const SignUpBox = () => {
  const [id, setId] = useState('admin');
  const [password, setPassword] = useState('sm46564323');
  const [email, setEmail] = useState('tjdah0853@gmail.com');
  const [nickname, setNickname] = useState('test');

  const dispatch = useDispatch();
  const state = useSelector((state) => state.signup.state);
  const idInputHandler = (e) => setId(e.target.value);
  const pwInputHandler = (e) => setPassword(e.target.value);
  const emailInputHandler = (e) => setEmail(e.target.value);
  const nicknameInputHandler = (e) => setNickname(e.target.value);
  const signUpHandler = () => {
    const data = {
      user_id: id,
      email: email,
      password: password,
      nickname: nickname,
    };
    dispatch(sign_up(data));
  };
  if (state === 'success') {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <div>
          <label htmlFor="id">id : </label>
          <input type="text" id="id" value={id} onChange={idInputHandler} />
        </div>
        <div>
          <label htmlFor="email">email : </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={emailInputHandler}
          />
        </div>
        <div>
          <label htmlFor="nickname">nickname : </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={nicknameInputHandler}
          />
        </div>
        <div>
          <label htmlFor="pw">pw : </label>
          <input
            type="password"
            id="pw"
            value={password}
            onChange={pwInputHandler}
          />
        </div>
        <label htmlFor="pwc">pwconfirm : </label>
        <input
          type="password"
          id="pwc"
          value={password}
          onChange={pwInputHandler}
        />
        <div>
          <button onClick={signUpHandler}>sign up</button>
          <span>{state}</span>
        </div>
      </div>
    );
  }
};

export default SignUpBox;
