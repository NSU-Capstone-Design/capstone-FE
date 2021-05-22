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
    backgroundColor: '#f2f1fc',
  },
  mainBox: {
    width: '1024px',
    margin: '20px 0',
  },
  mainContent: {
    marginLeft: '20px',
    marginBottom: '40px',
  },
  postInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    '& span': {
      color: '#7a7a7a',
      marginLeft: '10px',
    },
  },
  row: {
    display: 'flex',
  },
  commentLink: {
    color: '#848d94',
    cursor: 'pointer',
    fontWeight: 600,
    margin: '5px 5px 5px 50px',
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
  const [commObject, setCommObject] = useState('');
  const [commObjectId, setCommObjectId] = useState(null);
  const [answerContent, setAnswerContent] = useState('');

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
  const questionCommBtnHandler = () => {
    setCommObject('question');
    setCommObjectId(post.id);
    open();
  };
  const answerCommBtnHandler = (id) => {
    setCommObject('answer');
    setCommObjectId(id);
    open();
  };
  const makePostOrAnswerComment = async () => {
    let data = {
      content: comm,
      object_id: commObjectId,
      reply_to: null,
      where: commObject,
    };
    await makeApi(data);
    setComm('');
    close();
    dispatch(await getQAPost(match.params.id));
  };
  const answerContentHandler = (e) => {
    setAnswerContent(e.target.value);
  };
  const makeAnswerHandler = async () => {
    let data = {
      content: answerContent,
      question: post.id,
    };
    await makeApi(data);
    setAnswerContent('');
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
          <div className={classes.mainContent}>
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
                onClick={questionCommBtnHandler}
              >
                댓글추가
              </Button>
            </div>
          </div>
          <Divider />
          <CommentBox
            ReplyID={null}
            comments={post.comments}
            post_id={match.params.id}
            where="comment"
          />
          <Divider />
          <div className={classes.mainBox}>
            <h2 style={{ marginLeft: '15px', color: '#272727' }}>
              {post.answers.length}개의 답변
            </h2>
            {post.answers.length != 0 ? (
              post.answers.map((answer) => (
                <div className={classes.mainContent}>
                  <Divider />

                  <div className={classes.row}>
                    <div style={{ fontSize: '30px', margin: '10px' }}>A:</div>
                    <span>
                      <ReactMarkdown
                        components={CodeBlock}
                        children={answer.content}
                      />
                    </span>
                  </div>
                  <div className={classes.postInfo}>
                    <div>
                      <span>작성자 : </span>
                      {answer.nickname}
                    </div>
                    <div>
                      <span>Asked : </span>
                      {answer.created_at.slice(2, 10)}
                    </div>
                    <div>
                      <span>Active : </span>
                      {answer.updated_at.slice(2, 10)}
                    </div>
                  </div>

                  <CommentBox
                    ReplyID={null}
                    comments={answer.comments}
                    post_id={match.params.id}
                  />
                  <div
                    className={classes.commentLink}
                    onClick={() => {
                      answerCommBtnHandler(answer.id);
                    }}
                  >
                    답변에대한 댓글달기
                  </div>
                </div>
              ))
            ) : (
              <div style={{ marginLeft: '40px' }}>
                아직 답변이 달렸있지 않아요. 주변에 누군가에게 알려보는건
                어떨까요?
              </div>
            )}
          </div>
          <div className={classes.mainContent}>
            <h2 style={{ marginLeft: '15px', color: '#272727' }}>
              답변을 달아주세요
            </h2>
            <TextField
              id="outlined-textarea"
              label="답변"
              placeholder="마크다운의 코드블럭 문법을 사용시 하이라이팅된 코드를 작성하실수 있습니다:)"
              multiline
              rows={8}
              fullWidth
              value={answerContent}
              onChange={answerContentHandler}
              variant="outlined"
            />
            <Button
              color="primary"
              variant="contained"
              style={{ margin: '10px' }}
              onClick={makeAnswerHandler}
            >
              답변 등록
            </Button>
          </div>
        </div>
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
              onClick={makePostOrAnswerComment}
            >
              댓글추가
            </Button>
          </div>
        </ModalEvent>
      </div>
    </>
  );
};

export default QuestionDetail;
