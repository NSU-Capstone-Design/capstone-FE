import React, { useState } from 'react';
import { makeStyles, Divider, TextField, Button } from '@material-ui/core';
import useModalEvent from '../hooks/useModalEvent';
import { makeApi } from '../api/question';
import { useSelector, useDispatch } from 'react-redux';
import { getQAPost } from '../reducers/qaPost';

//CSS
const useStyle = makeStyles({
  commentBox: {
    marginLeft: '40px',
  },
  commentItemWrap: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0px',
  },
  commentUser: {
    width: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContent: {
    width: '75%',
    display: 'flex',
    alignItems: 'center',
  },
});

//HTML

const CommentBox = ({ comments, post_id }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.qaPost);
  const [reply, setReply] = useState(-1);
  const [modalState, setModalstate, open, close, ModalEvent] = useModalEvent(
    false
  );
  const [comm, setComm] = useState('');
  const makeComment = async (e) => {
    let data = {
      content: comm,
      object_id: post.id,
      reply_to: reply,
      where: 'comment',
    };
    await makeApi(data);
    close();
    dispatch(await getQAPost(post_id));
  };
  const writeComment = (id, e) => {
    console.log(id);
    setReply(id);
    open();
  };
  return (
    <div className={classes.commentBox}>
      <Divider />
      <div>
        {comments.map((comment) => {
          return (
            <>
              <div className={classes.commentItemWrap}>
                <div className={classes.commentUser}>{comment.nickname}</div>:
                <div className={classes.commentContent}>
                  {comment.content}
                  <span
                    style={{
                      color: '#7c7c7c',
                      marginLeft: '10px',
                    }}
                  >
                    {comment.created_at.slice(2, 10)}
                  </span>
                </div>
                <span
                  style={{
                    color: '#7c7c7c',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    writeComment(comment.id);
                  }}
                >
                  댓글달기
                </span>
              </div>
              {comment.replies.length !== 0 && (
                <CommentBox
                  replyPID={comment.id}
                  comments={comment.replies}
                  post_id={post_id}
                />
              )}
              <Divider />
            </>
          );
        })}
      </div>
      <ModalEvent state={modalState} close={close}>
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
            onClick={makeComment}
          >
            댓글추가
          </Button>
        </div>
      </ModalEvent>
    </div>
  );
};
export default CommentBox;
