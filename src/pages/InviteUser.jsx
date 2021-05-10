import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { check_token, myInfo, refreshAccessToken } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { getGroupDetail, no_expert_groupIn_list } from '../api/groupDetail';
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
    width: '240px',
    height: '367px',
    borderRadius: '5px',
    border: 'solid #aaaaaa 1px',
    margin: '0 30px 0 0',
    backgroundColor: '#ffffff',
    boxShadow: '3px 3px 3px #9a9a9a',
  },
  groupDetailContainer: {
    width: '230px',
    margin: '0 auto',
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
    display: '-webkit-box',
    lineHeight: '1.4',
    whiteSpace: 'normal',
    WebkitLineClamp: 11,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  memberManageContainer: {
    display: 'flex',
    height: '30px',
  },
  linkStyle1: {
    color: 'black',
    textDecoration: 'none',
    width: 'calc(60% - 30px)',
    height: 'auto',
    margin: 'auto',
  },
  linkStyle2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textDecoration: 'none',
    width: 'calc(40% - 30px)',
    height: '100%',
    margin: 'auto',
  },
  memberManage1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
    border: 'solid #aaaaaa 1px',
    '&': {},
    '&:hover': {
      backgroundColor: '#dddddd',
    },
  },
  memberManage2: {
    width: 'calc(60% - 28px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  memberInviteContainer1: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: 'auto',
    borderRadius: '15px',
    border: 'solid #aaaaaa 1px',
    '&': {},
    '&:hover': {
      backgroundColor: '#dddddd',
    },
  },
  memberInviteContainer2: {
    display: 'flex',
    justifyContent: 'center',
    width: 'calc(40% - 30px)',
    margin: 'auto',
    borderRadius: '15px',
    border: 'solid #aaaaaa 1px',
    '&': {},
    '&:hover': {
      backgroundColor: '#dddddd',
    },
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
  gridTitleContainer: {
    border: 'solid #aaaaaa 1px',
    boxShadow: '3px 3px 3px #9a9a9a',
    marginBottom: '10px',
    backgroundColor: '#ffffff',
  },
  gridTitleWrap: {
    display: 'grid',
    gridTemplateColumns: '175px 175px 175px 175px',
    gridTemplateRows: '40px',
    margin: '0 10px',
  },
  gridTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeContainer: {
    border: 'solid #aaaaaa 1px',
    boxShadow: '3px 3px 3px #9a9a9a',
    backgroundColor: '#ffffff',
  },
  noticeSpace: {
    height: '10px',
  },
  noticeBox: {
    display: 'grid',
    gridTemplateColumns: '700px',
    gridTemplateRows: '50px',
    gridAutoFlow: 'row',
    gridAutoRows: '50px',
    margin: '0 10px 0 10px',
  },
  noticeContent: {
    display: 'grid',
    gridTemplateColumns: '175px 175px 175px 175px ',
    gridTemplateRows: '48px',
    border: 'solid #aaaaaa 1px',
    marginBottom: '10px',
  },
  memberField: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '38px',
  },
});

const InviteUser = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.account.status);
  const [userList, setUserList] = useState([
    {
      user_id: '',
      email: '',
      nickname: '',
    },
  ]);
  const [groupDetail, setGroupDetail] = useState({
    group_name: '',
    introduce: '',
    group_visible: true,
    group_master: '',
  });
  const [User, setUser] = useState({
    user_id: '',
  });
  useEffect(async () => {
    const res = await check_token();
    const userInfo = await myInfo();
    if (res === 200) {
      dispatch(success_check());
    } else {
      console.log('로그인 창으로'); // 또는 에러 안내
    }
    const gd = await getGroupDetail(match.params.id);
    const ul = await no_expert_groupIn_list(gd);
    setGroupDetail(gd);
    setUserList(ul);
    setUser(userInfo);
    console.log(ul);
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
                  {groupDetail.introduce}
                </div>
                {User.user_id == groupDetail.group_master.user_id ? (
                  <div>
                    <div className={classes.memberManageContainer}>
                      <Link
                        to={`/group/${match.params.id}/memberManage/`}
                        className={classes.linkStyle1}
                      >
                        <div className={classes.memberManage1}>멤버관리</div>
                      </Link>
                      <Link
                        to={`/group/${match.params.id}/invite/`}
                        className={classes.linkStyle2}
                      >
                        <div className={classes.memberInviteContainer1}>
                          +초대
                        </div>
                      </Link>
                    </div>
                    <div className={classes.memberManageContainer}>
                      <div className={classes.memberManage2}></div>
                      <div className={classes.memberInviteContainer2}>설정</div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className={classes.BodyContainer}>
              <div className={classes.gridTitleContainer}>
                <div className={classes.gridTitleWrap}>
                  <div className={classes.gridTitle}>ID</div>
                  <div className={classes.gridTitle}>nickname</div>
                  <div className={classes.gridTitle}>email</div>
                  <div className={classes.gridTitle}>status</div>
                </div>
              </div>
              <div className={classes.noticeContainer}>
                <div className={classes.noticeSpace}></div>
                <div className={classes.noticeBox}>
                  {userList.map((data) => (
                    <div className={classes.noticeContent}>
                      <div className={classes.memberField}>{data.user_id}</div>
                      <div className={classes.memberField}>{data.nickname}</div>
                      <div className={classes.memberField}>{data.email}</div>
                    </div>
                  ))}
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

export default InviteUser;
