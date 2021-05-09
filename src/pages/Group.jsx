import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { check_token, myInfo } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { getGroupList } from '../api/group';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: '#f2f1fc',
  },
  groupListWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20vh',
    width: 'auto',
    height: 'auto',
  },
  groupListContainer: {
    display: 'grid',
    gridTemplateColumns: '240px 240px 240px 240px',
    gridTemplateRows: '20vh 20vh 20vh 20vh',
    gridAutoFlow: 'row',
    gridAutoRows: '20vh',
  },
  groupWrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '90%',
  },
  groupBox: {
    width: '80%',
    height: '100%',
    boxShadow: '3px 3px 3px #9a9a9a',
    backgroundColor: 'white',
    '&': {},
    '&:hover': {
      backgroundColor: '#dddddd',
    },
  },
  linkStyle: {
    color: 'black',
    textDecoration: 'none',
  },
  groupName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(30% - 1px)',
    borderBottom: 'solid #aaaaaa 1px',
    fontSize: '15pt',
  },
  groupIntro: {
    display: '-webkit-box',
    lineHeight: '1.4',
    height: '7em',
    width: 'calc(100% - 6px)',
    padding: '0 1px 0 5px',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  groupPlus: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(65% - 1px)',
    borderBottom: 'solid #aaaaaa 1px',
    fontSize: '30pt',
  },
});

// 추후  useStyles 분리
const GroupItem = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.groupWrap}>
      <div className={classes.groupBox}>
        <Link to={`/group/${data.id}`} className={classes.linkStyle}>
          <div className={classes.groupName}>{data.group_name}</div>
          <div className={classes.groupIntro}>{data.introduce}</div>
        </Link>
      </div>
    </div>
  );
};

const Group = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loginState = useSelector((state) => state.account.status);
  const [isExpertUser, defExpert] = useState(false);
  const [groupList, setGroupList] = useState([
    {
      group_name: '',
      introduce: '',
      group_visible: true,
      group_master: '',
    },
  ]);
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    } else {
      console.log('로그인 창으로'); // 또는 에러 안내
    }
    const gl = await getGroupList();
    defExpert(gl[0].isExpertUser);
    console.log('출력1: >>>>>>', gl[0]);
    console.log('출력2: >>>>>>', gl[1]);
    console.log('출력3: >>>>>>', gl[0].isExpertUser);
    setGroupList(gl[1]);
  }, []);

  // if (isExpertUser.expertUser) {
  return (
    <>
      <Header loginState={loginState} />
      <div className={classes.mainContainer}>
        <div className={classes.groupListWrap}>
          <div className={classes.groupListContainer}>
            {isExpertUser ? (
              <div className={classes.groupWrap}>
                <div className={classes.groupBox}>
                  <Link to="/group/create/" className={classes.linkStyle}>
                    <div className={classes.groupPlus}>+</div>
                    <div className={classes.groupIntro}>그룹추가</div>
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}

            {groupList.map((data) => (
              <GroupItem data={data} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
  // } else {
  //   return (
  //     <>
  //       <Header loginState={loginState} />
  //       <div className={classes.mainContainer}>
  //         <div className={classes.groupListWrap}>
  //           <div className={classes.groupListContainer}>
  //             {groupList.map((data) => (
  //               <GroupItem data={data} />
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
};

//  {groupList.map((data) => (
//  <GroupItem data={data} />
//  ))}
// 애로우펑션 뒤에 중괄호가 없으면 바로 리턴 실행

export default Group;
