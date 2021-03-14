import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { getLevel } from '../../reducers/account/level';

const useStyles = makeStyles({});

const LoginSuccess = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, level, error } = useSelector((state) => {
    console.log('안녕하세요 ^^ ;;;;;;;;;;');
    return state.level;
  });
  useEffect(() => {
    dispatch(getLevel());
  }, [dispatch]);
  if (loading) return <div>로딩중...</div>;
  else
    return (
      <>
        <div>
          <div>{level}??</div>
        </div>
      </>
    );
};

export default LoginSuccess;
