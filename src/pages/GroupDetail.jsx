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
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 'auto',
    backgroundColor: '#f2f1fc',
  },
  mainWrap: {
    width: '70vw',
  },
  groupTitle: {
    margin: '120px 0 60px 0',
    height: '60px',
    borderBottom: 'solid #aaaaaa 1px',
    fontSize: '30pt',
  },
  appContainer: {
    display: 'flex',
  },
  groupManagementContainer: {
    display: 'flex',
    width: '240px',
    height: '370px',
    borderRadius: '5px',
    border: 'solid #aaaaaa 1px',
    margin: '0 30px 0 0',
  },
  groupDetailContainer: {
    width: '230px',
    margin: '0 auto 5px auto',
  },
  groupMaster: {
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: 'solid #aaaaaa 1px',
  },
  groupIntroduce: {
    height: '240px',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    borderBottom: 'solid #aaaaaa 1px',
  },
  memberManageContainer: {
    display: 'flex',
    height: '30px',
  },
  memberManage1: {
    width: 'calc(60% - 30px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
    border: 'solid #aaaaaa 1px',
    margin: 'auto',
  },
  memberManage2: {
    width: 'calc(60% - 28px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  memberInviteContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: 'calc(40% - 30px)',
    margin: 'auto',
    borderRadius: '15px',
    border: 'solid #aaaaaa 1px',
  },
  memberInviteIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '30px',
  },
  memberInviteLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'calc(100% - 30px)',
  },
  groupSetting: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    height: '30px',
  },
  BodyContainer: {
    width: '720px',
  },
  bodyNav: {
    display: 'flex',
    height: '50px',
  },
  navButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: 'calc(100% - 1)',
    borderRadius: '25px 25px 0 0',
    border: 'solid #aaaaaa 1px',
    borderBottom: 0,
  },
  navSpace: {
    height: 'calc(100% - 1px)',
    width: 'calc(100% - 202px)',
    borderBottom: 'solid #aaaaaa 1px',
  },
  noticeContainer: {
    borderLeft: 'solid #aaaaaa 1px',
    borderRight: 'solid #aaaaaa 1px',
    borderBottom: 'solid #aaaaaa 1px',
  },
  noticeSpace: {
    height: '10px',
  },
  noticeBox: {
    display: 'grid',
    gridTemplateColumns: '700px',
    gridTemplateRows: '200px 200px 200px 200px 200px',
    gridAutoFlow: 'row',
    gridAutoRows: '200px',
    margin: '0 10px 20px 10px',
  },
  noticeContent: {
    width: '100%',
    height: '180px',
    border: 'solid #aaaaaa 1px',
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
    console.log('test1: >>>', gd);
    setGroupDetail(gd);
    console.log('test2: >>>', groupDetail);
  }, []);

  return (
    <>
      <Header loginState={loginState} />
      <div className={classes.mainContainer}>
        <div className={classes.mainWrap}>
          <div className={classes.groupTitle}>{groupDetail.group_name}</div>
          <div className={classes.appContainer}>
            <div className={classes.groupManagementContainer}>
              <div className={classes.groupDetailContainer}>
                <div className={classes.groupMaster}>
                  {groupDetail.group_master.nickname}님의 그룹
                </div>
                <div className={classes.groupIntroduce}>
                  {groupDetail.introduce}정신 나갈거 같아 정신 나갈거 같아 정신
                  나갈거 같아 정신 나갈거 같아 정신 나갈거 같아 정신 나갈거 같아
                  정신 나갈거 같아 정신 나갈거 같아 정신 나갈거 같아 정신 나갈거
                  같아 정신 나갈거 같아
                </div>
                <div className={classes.memberManageContainer}>
                  <div className={classes.memberManage1}>멤버관리</div>
                  <div className={classes.memberInviteContainer}>+초대</div>
                </div>
                <div className={classes.memberManageContainer}>
                  <div className={classes.memberManage2}></div>
                  <div className={classes.memberInviteContainer}>설정</div>
                </div>
              </div>
            </div>
            <div className={classes.BodyContainer}>
              <div className={classes.bodyNav}>
                <div className={classes.navButton}>공지사항</div>
                <div className={classes.navButton}>문제</div>
                <div className={classes.navSpace}></div>
              </div>
              <div className={classes.noticeContainer}>
                <div className={classes.noticeSpace}></div>
                <div className={classes.noticeBox}>
                  <div className={classes.noticeContent}>
                    이 구간 css는 추후 라우터 이동 예정
                  </div>
                </div>
                <div className={classes.noticeSpace}></div>
              </div>
            </div>
          </div>
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
