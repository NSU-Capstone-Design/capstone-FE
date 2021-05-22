import React, { useEffect, useState } from 'react';
import { myInfo, withdrawalApi } from '../api/account';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import { makeStyles, Grid, Card, Button } from '@material-ui/core';
import { myCorrectProbsApi, myPassProbsApi } from '../api/problem';
import { myQuestionsApi } from '../api/question';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { FRONT_BASE_URL } from '../api/account';
import useModalEvent from '../hooks/useModalEvent';
import { success_check } from '../reducers/account/authenticate';
import { check_token } from '../api/account';

const useStyles = makeStyles({
  mypageWrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '60px',
  },
  mypageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '1024px',
  },
  row1: {
    width: '100%',
    height: '500px',
  },
  row2: {
    width: '600px',
  },
  navTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: '10px 0px',
  },
  basicNav: {
    height: 'calc(100% - 65px)',
    overflowY: 'scroll',
  },
  cardContainer: {
    width: 'calc(100% - 20px)',
    height: '100%',
    padding: '10px',
  },
  myInfoCard: {
    padding: '20px',
    margin: '20px 0px',
    width: 'calc(100% - 40px)',
    display: 'flex',
    alignItems: 'center',
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Mypage = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: '',
    user_id: '',
    nickname: '',
    level: '',
    expert_user: false,
  });
  const [correctList, setCorrectList] = useState([
    {
      user: '',
      prob: '',
      correct: true,
    },
  ]);
  const [passList, setPassList] = useState([
    {
      user: '',
      prob: '',
      correct: true,
    },
  ]);
  const [myQList, setMyQList] = useState([
    {
      id: 0,
      user_id: 0,
      prob_num: 0,
      subject: '',
      content: '',
      created_at: '',
      updated_at: '',
      post_hit: 0,
    },
  ]);
  const [modalState, setModalstate, open, close, ModalEvent] = useModalEvent(
    false
  );
  const classes = useStyles();
  const loginState = useSelector((state) => state.account.status);
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    }
    const data = await myInfo();
    const sl = await myCorrectProbsApi();
    const pl = await myPassProbsApi();
    const mq = await myQuestionsApi();
    setCorrectList(sl);
    setPassList(pl);
    setMyQList(mq);
    console.log(mq);
    setUserInfo(data);
  }, []);
  const withdrawal = async () => {
    const result = await withdrawalApi();
    if (result) {
      alert('회원탈퇴가 완료되었습니다.');
      window.localStorage.removeItem('access');
      window.localStorage.removeItem('refresh');
      window.location.href = FRONT_BASE_URL + '/login';
    } else {
      alert('탈퇴할수 없습니다.');
    }
  };
  return (
    <>
      <Header loginState={loginState} />
      <div className={classes.mypageWrap}>
        <div className={classes.mypageContainer}>
          <h1>마이페이지</h1>
          <div className={classes.row2}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={8}>
                <Card className={classes.myInfoCard}>
                  <div
                    style={{
                      width: '30%',
                      display: 'flex',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 700,
                    }}
                  >
                    프로필 정보
                  </div>
                  <div
                    style={{ width: 'calc(70% - 10px)', marginLeft: '10px' }}
                  >
                    <div>기본정보 가져오기</div>
                    <div>user_id : {userInfo.user_id}</div>
                    <div>nicknamae : {userInfo.nickname}</div>
                    <div>현재 레벨 : {userInfo.level}</div>
                  </div>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  margin: '20px 0px',
                }}
              >
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ margin: '10px' }}
                  onClick={open}
                >
                  회원 탈퇴
                </Button>
                <ModalEvent state={modalState} close={close}>
                  <div>
                    <h3>회원 탈퇴시 회원님 관련 모든 데이터가 사라집니다. </h3>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ margin: '10px' }}
                      onClick={withdrawal}
                    >
                      회원 탈퇴
                    </Button>
                  </div>
                </ModalEvent>
              </Grid>
            </Grid>
          </div>
          <Grid container spacing={1} className={classes.row1}>
            <Grid item sm={4} style={{ height: '100%' }}>
              <Card className={classes.cardContainer}>
                <div className={classes.navTitle}>내가 푼 문제</div>
                <Divider />
                <List
                  component="nav"
                  aria-label="secondary mailbox folders"
                  className={classes.basicNav}
                >
                  {correctList.map((ci) => (
                    <ListItemLink href={`${FRONT_BASE_URL}/problem/${ci.prob}`}>
                      <ListItemText primary={ci.prob} />
                    </ListItemLink>
                  ))}
                  {correctList.length === 0 && (
                    <div style={{ margin: '20px 10px', color: '#979797' }}>
                      아직 데이터가 없습니다 :)
                    </div>
                  )}
                </List>
              </Card>
            </Grid>
            <Grid item sm={4}>
              <Card className={classes.cardContainer}>
                <div className={classes.navTitle}>내가 넘긴 문제</div>
                <Divider />
                <List
                  component="nav"
                  aria-label="secondary mailbox folders"
                  className={classes.basicNav}
                >
                  {passList.map((pi) => (
                    <ListItemLink href={`${FRONT_BASE_URL}/problem/${pi.prob}`}>
                      <ListItemText primary={pi.prob} />
                    </ListItemLink>
                  ))}
                  {passList.length === 0 && (
                    <div style={{ margin: '20px 10px', color: '#979797' }}>
                      아직 데이터가 없습니다 :)
                    </div>
                  )}
                </List>
              </Card>
            </Grid>
            <Grid item sm={4}>
              <Card className={classes.cardContainer}>
                <div className={classes.navTitle}>내가 남긴 질문</div>
                <Divider />
                {myQList.map((qi) => {
                  return (
                    <ListItemLink href={`${FRONT_BASE_URL}/question/${qi.id}`}>
                      <ListItemText primary={qi.subject} />
                    </ListItemLink>
                  );
                })}
                {myQList.length === 0 && (
                  <div style={{ margin: '20px 10px', color: '#979797' }}>
                    아직 데이터가 없습니다 :)
                  </div>
                )}
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Mypage;
