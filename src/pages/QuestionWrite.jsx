import React, { useState, useEffect } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import Header from '../components/Header';
import { check_token, FRONT_BASE_URL } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { makeApi } from '../api/question';

const useStyles = makeStyles({
  mainContainer: {
    marginTop: '60px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  mainBox: {
    width: '1024px',
    margin: '20px 0',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const Question = ({ match }) => {
  const loginState = useSelector((state) => state.account.status);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [post, setPost] = useState('');
  const [subject, setSubject] = useState('');
  const [problemId, setProblemId] = useState(match.params.id);

  useEffect(async () => {
    console.log(match);
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    } else {
      console.log('로그인 창으로'); // 또는 에러 안내
    }
  }, []);

  const makePost = async () => {
    let data = {
      subject: subject,
      content: post,
      problem: problemId,
    };
    await makeApi(data);
    window.location.href = FRONT_BASE_URL + '/question';
  };

  return (
    <>
      <Header loginState={loginState} />
      <div className={classes.mainContainer}>
        <div className={classes.mainBox}>
          <h2 style={{ textAlign: 'center' }}>질문 작성하기</h2>
          <p>
            <TextField
              id="subject"
              label="제목"
              style={{ width: '400px', marginTop: '20px' }}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </p>
          <p>
            <TextField
              id="problem-id"
              label="문제번호"
              style={{ width: '400px', marginTop: '20px' }}
              value={problemId}
              onChange={(e) => {
                setProblemId(e.target.value);
              }}
            />
          </p>
          <p>
            <TextField
              id="content"
              label="내용"
              multiline
              rows={4}
              variant="outlined"
              style={{ width: '400px', marginTop: '20px' }}
              value={post}
              onChange={(e) => {
                setPost(e.target.value);
              }}
            />
          </p>
          <p>
            <Button
              color="primary"
              variant="contained"
              style={{ width: '400px', margin: '20px 0px' }}
              onClick={makePost}
            >
              등록
            </Button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Question;
