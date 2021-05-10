import React, { useState, useEffect } from 'react';
import { makeStyles, Divider, Button, TextField } from '@material-ui/core';
import Header from '../components/Header';
import { check_token } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { qaDetailApi } from '../api/question';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../components/CodeBlock';
import CommentBox from '../containers/CommentBox';
import { getQAPost } from '../reducers/qaPost';
import useModalEvent from '../hooks/useModalEvent';
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
  },
  postInfo: {
    display: 'flex',
    alignItems: 'center',
    '& span': {
      color: '#7a7a7a',
      marginLeft: '10px',
    },
  },
});

const QuestionDetail = ({ match }) => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.account.status);
  // const [post, setPost] = useState({
  //   user_id: '',
  //   prob_num: '',
  //   subject: '',
  //   content: '',
  //   created_at: '',
  //   updated_at: '',
  //   post_hit: '',
  //   answers: [],
  //   comments: [],
  // });
  const { loading, post, error } = useSelector((state) => state.qaPost);
  const [comm, setComm] = useState('');

  const classes = useStyles();
  useEffect(async () => {
    dispatch(await getQAPost(match.params.id));
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    }
  }, []);
  const [modalState, setModalstate, open, close, ModalEvent] = useModalEvent(
    false
  );
  const makePostComment = async () => {
    let data = {
      content: comm,
      object_id: post.id,
      reply_to: null,
      where: 'question',
    };
    await makeApi(data);
    close();
    dispatch(await getQAPost(match.params.id));
  };
  return (
    <>
      <Header loginState={loginState} />
      <div className={classes.mainContainer}>
        <div className={classes.mainBox}>
          <h1 style={{ marginLeft: '10px', color: '#272727' }}>
            {post.subject}
          </h1>
          <div className={classes.postInfo}>
            <div>
              <span>Asked : </span>
              {post.created_at.slice(2, 10)}
            </div>
            <div>
              <span>Active : </span>
              {post.updated_at.slice(2, 10)}
            </div>
            <div>
              <span>hit : </span>
              {post.post_hit}
            </div>
            <div>
              <span>문제 번호 : </span>
              {post.prob_num}
            </div>
            <div>
              <span>답변 수 : </span>
              {post.answers.length}
            </div>
          </div>
          <Divider style={{ margin: '20px 10px' }} />
          <div
            style={{
              width: 'calc(100% - 20px)',
              margin: '10px',
            }}
          >
            <ReactMarkdown components={CodeBlock} children={post.content} />
          </div>
          <div style={{ margin: '30px', textAlign: 'right' }}>
            <span>작성자 : {post.nickname}</span>
            <Button
              color="primary"
              variant="contained"
              style={{ marginLeft: '10px' }}
              onClick={open}
            >
              댓글추가
            </Button>
            <ModalEvent state={modalState} close={close}>
              <h2 style={{ marginLeft: '10px', textAlign: 'left' }}>
                질문에대한 댓글입니다.
              </h2>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  margin: '10px',
                  width: '500px',
                }}
              >
                <TextField
                  id="standard-basic"
                  label="댓글"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={comm}
                  style={{ width: '400px' }}
                  onChange={(e) => {
                    setComm(e.target.value);
                  }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginLeft: '10px' }}
                  onClick={makePostComment}
                >
                  댓글추가
                </Button>
              </div>
            </ModalEvent>
          </div>
          <CommentBox
            ReplyID={null}
            comments={post.comments}
            post_id={match.params.id}
          />
        </div>
      </div>
    </>
  );
};

export default QuestionDetail;
