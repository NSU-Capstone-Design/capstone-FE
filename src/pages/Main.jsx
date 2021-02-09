import React from 'react';
import { makeStyles } from '@material-ui/core';
import Counter from '../components/Counter';
import TodosContainer from '../containers/TodosContainer';
import LoginBox from '../containers/account/LoginBox';

const useStyle = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
});

const Main = () => {
  const classes = useStyle();
  return (
    <div className={classes.mainContainer}>
      <div>메인페이지</div>
      <LoginBox />
    </div>
  );
};

export default Main;
