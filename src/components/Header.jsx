import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/account/authenticate';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { check_token } from '../api/account';

const useStyle = makeStyles({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    border: '1px solid black',
  },
});

const Header = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    window.localStorage.removeItem('access');
    window.localStorage.removeItem('refresh');
    dispatch(logout());
  };
  const [loginState, setLoginState] = useState('fail');
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      setLoginState('success');
    }
  }, []);
  if (loginState === 'success')
    return (
      <div>
        <div>Header</div>
        <div className={classes.headerContainer}>
          <div>logo</div>
          <Link to="/mypage">계정 관리</Link>
          <Link to="/login" onClick={logoutHandler}>
            logout
          </Link>
        </div>
      </div>
    );
  else
    return (
      <div>
        <div>Header</div>
        <div className={classes.headerContainer}>
          <div>logo</div>
          <Link to="/login">LOGIN</Link>
        </div>
      </div>
    );
};

export default Header;
