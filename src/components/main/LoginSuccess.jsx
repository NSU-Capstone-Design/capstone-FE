import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { getLevel } from '../../reducers/account/level';
import LevelTest from './LevelTest';

const useStyles = makeStyles({});

const LoginSuccess = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, level, error } = useSelector((state) => {
    return state.level;
  });
  useEffect(() => {
    dispatch(getLevel());
  }, [dispatch]);
  if (loading) return <div>로딩중...</div>;
  else {
    if (level === null)
      return (
        <div style={{ margin: '30px 0' }}>
          <LevelTest />
        </div>
      );
    else return <div>맞춤 문제{level}</div>;
  }
};

export default LoginSuccess;
