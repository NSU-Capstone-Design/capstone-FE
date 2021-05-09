import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { getLevel } from '../../reducers/account/level';
import LevelTest from './LevelTest';
import MainService from './MainService';

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
    if (level === null) return <LevelTest />;
    else
      return (
        <>
          <MainService />
        </>
      );
  }
};

export default LoginSuccess;
