import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { check_token } from '../api/account';
import { Redirect } from 'react-router-dom';
import GroupCreateBox from '../containers/account/GroupCreateBox';
import Header from '../components/Header';

const useStyle = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#eeeeee',
  },
  bodyWrap: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '75vh',
    borderRadius: '25px',
    marginTop: '100px',
    boxShadow: '3px 3px 3px #9a9a9a',
  },
  bodyContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '75%',
    width: 'calc(100% - 50px)',
  },
  tmp: {
    width: '50%',
    height: '13%',
    margin: '25px',
    marginBottom: 0,
  },
});

const GroupCreate = () => {
  const classes = useStyle();
  const [loginState, setLoginState] = useState('success');
  useEffect(async () => {
    const res = await check_token();
    console.log(res);
    if (res !== 200) {
      setLoginState('fail');
    }
  }, []);
  if (loginState === 'success') {
    return (
      <>
        <Header loginState={loginState} />
        <div className={classes.mainContainer}>
          <div className={classes.bodyWrap}>
            <div className={classes.bodyContainer}>
              <img className={classes.tmp} src="/static/logo.png" alt="" />
              <GroupCreateBox />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Redirect to="/main" />;
  }
};

export default GroupCreate;
