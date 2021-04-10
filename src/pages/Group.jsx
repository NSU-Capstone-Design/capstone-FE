import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { check_token } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { getGroupList } from '../api/group';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#eeeeee',
  },
  bodyWrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
    height: '90vh',
    marginTop: '30px',
    borderTop: 'solid #cccccc 1px',
  },
  groupListWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20vh',
    width: '50%',
    height: '80vh',
  },
  groupListContainer: {
    height: '100%',
    width: '100%',
  },
  groupListBox: {
    display: 'flex',
    height: '20%',
    width: '100%',
    marginBottom: '4%',
  },
  groupWrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '20%',
    height: '100%',
  },
  groupBox: {
    width: '60%',
    height: '100%',
    backgroundColor: 'white',
    boxShadow: '3px 3px 3px #9a9a9a',
  },
  groupImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(65% - 1px)',
    borderBottom: 'solid #aaaaaa 1px',
  },
  groupName: {
    height: '35%',
  },
});

const Group = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loginState = useSelector((state) => state.account.status);
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    } else {
      console.log('로그인 창으로'); // 또는 에러 안내
    }
    const gl = await getGroupList();
  }, []);
  return (
    <>
      <Header loginState={loginState} />
      <div className={classes.mainContainer}>
        <div className={classes.groupListWrap}>
          <div className={classes.groupListContainer}>
            <div className={classes.groupListBox}>
              <div className={classes.groupWrap}>
                <div className={classes.groupBox}>
                  <div className={classes.groupImg}>+</div>
                  <div className={classes.groupName}></div>
                </div>
              </div>
            </div>
            <div className={classes.groupListBox}>
              <div className={classes.groupWrap}>
                <div className={classes.groupBox}></div>
              </div>
            </div>
            <div className={classes.groupListBox}>
              <div className={classes.groupWrap}>
                <div className={classes.groupBox}></div>
              </div>
            </div>
            <div className={classes.groupListBox}>
              <div className={classes.groupWrap}>
                <div className={classes.groupBox}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Group;
