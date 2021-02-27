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
    width: '1024px',
    height: '60px',
  },
  headerWrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    border: '1px solid black',
  },
  subNav: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '350px',
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
      <div className={classes.headerWrap}>
        <div className={classes.headerContainer}>
          <Link to="/">
            <div>logo</div>
          </Link>

          <div className={classes.subNav}>
            <Link to="/question">QUESTION</Link>
            <Link to="/search">SEARCH</Link>
            <Link to="/group">GROUP</Link>
            <Link to="/mypage">MY_PAGE</Link>
            <Link to="/login" onClick={logoutHandler}>
              logout
            </Link>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className={classes.headerWrap}>
        <div className={classes.headerContainer}>
          <Link to="/">
            <div>logo</div>
          </Link>
          <div className={classes.subNav}>
            <Link to="/question">QUESTION</Link>
            <Link to="/search">SEARCH</Link>
            <Link to="/group">GROUP</Link>
            <Link to="/login">LOGIN</Link>
          </div>
        </div>
      </div>
    );
};

export default Header;
