import React, { useState, useEffect } from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import Header from '../components/Header';
import { check_token } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { qaDetailApi } from '../api/question';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../components/CodeBlock';
import CommentBox from '../containers/CommentBox';
import { getQAPost } from '../reducers/qaPost';

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
  const classes = useStyles();
  useEffect(async () => {
    dispatch(await getQAPost(match.params.id));
    console.log(post, 'pd');
    // const postData = await qaDetailApi(match.params.id);
    // console.log('postData : ', postData);
    // setPost(postData);
  }, []);

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
            작성자 : {post.nickname}
          </div>
          <CommentBox ReplyID={null} comments={post.comments} />
        </div>
      </div>
    </>
  );
};

export default QuestionDetail;
