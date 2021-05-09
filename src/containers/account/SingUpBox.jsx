import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sign_up } from '../../reducers/account/signUp';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  txtContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  txtBox: {
    borderRadius: '10px',
    width: 'calc(100% - 20px)',
    height: '40px',
    margin: '39px 10px 1px 10px',
    border: 'solid #898989 1px',
    outline: 0,
  },
  statusStyle: {
    display: 'flex',
    fontSize: '8pt',
    color: 'red',
    width: 'calc(100% - 20px)',
  },
  buttonContainer: {
    borderBottom: 'solid 1px #b7b7b7',
    marginBottom: '15px',
    width: '100%',
  },
  buttonBox: {
    borderRadius: '10px',
    width: 'calc(100% - 18px)',
    height: '42px',
    margin: '40px 10px 100px 10px',
    backgroundColor: '#fd8083',
    color: 'white',
    border: 'none',
    outline: 0,
  },
  signUpContainer: {
    marginTop: '15px',
    fontSize: '10pt',
  },
});

const SignUpBox = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const classes = useStyle();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.signup.state);
  const [pwState, setPWState] = useState(true);
  const idInputHandler = (e) => setId(e.target.value);
  const pwInputHandler = (e) => setPassword(e.target.value);
  const passwordCHandler = (e) => setPasswordC(e.target.value);
  const emailInputHandler = (e) => setEmail(e.target.value);
  const nicknameInputHandler = (e) => setNickname(e.target.value);
  console.log(state);
  const signUpHandler = () => {
    console.log('hihi');
    const data = {
      user_id: id,
      email: email,
      password: password,
      nickname: nickname,
    };
    dispatch(sign_up(data));
  };
  useEffect(() => {
    if (password === passwordC) {
      setPWState(true);
    } else {
      setPWState(false);
    }
  }, [password, passwordC]);
  if (state === 'success') {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.txtContainer}>
          <input
            className={classes.txtBox}
            type="text"
            id="id"
            value={id}
            onChange={idInputHandler}
            placeholder="아이디"
          />
          <input
            className={classes.txtBox}
            type="nickname"
            id="nickname"
            value={nickname}
            onChange={nicknameInputHandler}
            placeholder="이름"
          />
          <input
            className={classes.txtBox}
            type="email"
            id="email"
            value={email}
            onChange={emailInputHandler}
            placeholder="이메일"
          />
          <input
            className={classes.txtBox}
            type="password"
            id="pw"
            value={password}
            onChange={pwInputHandler}
            placeholder="비밀번호"
          />
          <input
            className={classes.txtBox}
            type="password"
            id="pw_confirm"
            value={passwordC}
            onChange={passwordCHandler}
            placeholder="비밀번호 확인"
          />
          {!pwState && (
            <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
          )}
          <div className={classes.statusStyle}>
            <span>{state}</span>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <button className={classes.buttonBox} onClick={signUpHandler}>
            회원가입
          </button>
        </div>
      </div>
    );
  }
};

export default SignUpBox;
