import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { check_token, refreshAccessToken } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { getGroupDetail } from '../api/groupDetail';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height: 'auto',
    marginTop: '200px',
    backgroundColor: '#f2f1fc',
  },
});

const GroupDetail = ({ match }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loginState = useSelector((state) => state.account.status);
  const [groupDetail, setGroupDetail] = useState({
    group_name: '',
    introduce: '',
    group_visible: true,
    group_master: '',
  });
  const [groupManageList, setGroupManageList] = useState([
    {
      group_id: '',
      member: '',
      status: false,
    },
  ]);
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    } else {
      console.log('로그인 창으로'); // 또는 에러 안내
    }
    const gd = await getGroupDetail(match.params.id);
    setGroupDetail(gd[0]);
    setGroupManageList(gd[1]);
    console.log(gd);
  }, []);

  return (
    <>
      <Header loginState={loginState} />
      <div className={classes.mainContainer}>
        <div>{groupDetail.group_master}</div>
        <div>{groupDetail.group_name}</div>
        <div>{groupDetail.introduce}</div>
        <div>
          {groupManageList.map((data) => (
            <div>
              <div>{data.group_id}</div>
              <div>{data.member.nickname}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

//  {groupList.map((data) => (
//  <GroupItem data={data} />
//  ))}
// 애로우펑션 뒤에 중괄호가 없으면 바로 리턴 실행

export default GroupDetail;
