import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../reducers/account/authenticate';
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

const LoginBox = ({ status }) => {
  const classes = useStyle();
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
    <div className={classes.mainContainer}>
      <div className={classes.txtContainer}>
        <input
          className={classes.txtBox}
          type="text"
          id="id"
          value={id}
          onChange={idInputHandler}
          placeholder="사용자 아이디 또는 이메일"
        />
        <input
          className={classes.txtBox}
          type="password"
          id="pw"
          value={password}
          onChange={pwInputHandler}
          placeholder="비밀번호"
        />
        <div className={classes.statusStyle}>
          <span>{status}</span>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <button className={classes.buttonBox} onClick={loginHandler}>
          로그인
        </button>
      </div>
      <div className={classes.signUpContainer}>
        계정이 없으신가요? <Link to="/signup">가입하기</Link>
      </div>
    </div>
  );
};

export default LoginBox;
