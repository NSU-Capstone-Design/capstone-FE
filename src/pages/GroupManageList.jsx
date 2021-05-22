import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { check_token } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { getGroupManageList } from '../api/groupDetail';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 'auto',
    marginTop: '200px',
    backgroundColor: '#f2f1fc',
  },
});

const GroupManageList = ({ match }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loginState = useSelector((state) => state.account.status);
  const [memberList, setMeberList] = useState([
    {
      group_id: '',
      member: '',
      status: '',
    },
  ]);
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    } else {
      console.log('로그인 창으로');
    }
    console.log('error1');
    const gml = await getGroupManageList(match.params.id);
    console.log('error2');
    setMeberList(gml);
    console.log('error3');
    console.log(memberList);
  }, []);
  return (
    <>
      <Header loginState={loginState} />
      {memberList.map((data) => (
        <div className={classes.mainContainer}>
          <div>{data.group_id.group_name}</div>
          <div>{data.member.nickname}</div>
        </div>
      ))}
    </>
  );
};

export default GroupManageList;
