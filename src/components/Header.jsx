import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/account/authenticate';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
  return (
    <div>
      <div>Header</div>
      <div className={classes.headerContainer}>
        <div>logo</div>
        <Link to="/mypage">계정 관리</Link>
        <button onClick={logoutHandler}>logout</button>
      </div>
    </div>
  );
};

export default Header;
