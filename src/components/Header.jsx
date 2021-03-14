import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/account/authenticate';
import { makeStyles, Button } from '@material-ui/core';
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
    backgroundColor: '#fafafa',
    height: '60px',
    top: '0px',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    zIndex: '3',
    boxShadow: '-1px 5px 18px 0px rgba(0,0,0,0.5)',
  },
  subNav: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '30%',
    height: '100%',
    '& a': {
      textDecoration: 'none',
      color: '#352828',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // display: 'inline-block',
    },
    '& a:hover': {
      color: 'white',
      fontWeight: 700,
      backgroundColor: '#ff6d6d',
    },
  },
  accountBox: {
    marginRight: '10px',
  },
});

const Header = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    window.localStorage.removeItem('access');
    window.localStorage.removeItem('refresh');
    dispatch(logout());
    setLoginState('fail');
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
          <Link to="/" style={{ marginLeft: '10px' }}>
            <img src="/static/duck.png" alt="" style={{ width: '30px' }} />
          </Link>

          <div className={classes.subNav}>
            <Link to="/question">Q&A</Link>
            <Link to="/search">문제찾기</Link>
            <Link to="/group">그룹</Link>
            <Link to="/mypage">마이페이지</Link>
          </div>
          <div className={classes.accountBox}>
            <Link to="/" onClick={logoutHandler}>
              <Button variant="contained" color="secondary">
                로그아웃
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className={classes.headerWrap}>
        <div className={classes.headerContainer}>
          <Link to="/" style={{ marginLeft: '10px' }}>
            <img src="/static/duck.png" alt="" style={{ width: '30px' }} />
          </Link>
          <div className={classes.subNav}>
            <Link to="/question">Q&A</Link>
            <Link to="/search">문제찾기</Link>
            <Link to="/group">그룹</Link>
          </div>
          <div className={classes.accountBox}>
            <Link to="/login" onClick={logoutHandler}>
              <Button variant="contained" color="secondary">
                로그인
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Header;
