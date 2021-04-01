import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  videoWrap: {
    position: 'relative',
    width: '100%',
    height: '600px',
    overflow: 'hidden',
  },
  blackCover: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0,0,0,0.5)',
  },
  text: {
    fontSize: '25px',
    margin: '10px',
  },
  startBtn: {
    position: 'relative',
    zIndex: '1',
    textDecoration: 'none',
    margin: '40px',
    cursor: 'pointer',
  },
  row1: {
    position: 'relative',
    width: '100%',
    height: '600px',
    '& .main-img-box1': {
      width: '800px',
      borderRadius: '5px',
      position: 'absolute',
      left: 'calc(50% - 400px)',
      top: '50px',
    },
    '& .main-img-box2': {
      width: '300px',
      height: '400px',
      borderRadius: '5px',
      position: 'relative',
      left: 'calc(50% - 400px)',
      top: '50px',
    },
  },
  whiteText: {
    marginTop: '20px',
    color: 'white',
    fontSize: '25px',
    fontWeight: 600,
  },
});

const LoginSuccess = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <div className={classes.videoWrap}>
        <div className={classes.blackCover}>
          <div className={classes.text}>용희야 어떤 문구가 좋을까??</div>
          <div className={classes.text}>지금 바로 서비스를 시작해 보아요!</div>
          <Link to="/login" className={classes.startBtn}>
            <Button variant="contained" color="secondary">
              지금 시작하기
            </Button>
          </Link>
        </div>
        <video
          autoPlay
          muted
          loop
          height="600px"
          width="100%"
          style={{ objectFit: 'cover' }}
        >
          <source src="/static/test.mov" type="video/mp4" />
        </video>
      </div>
      <div className={classes.row1}>
        <div
          style={{
            backgroundColor: '#313131',
            height: '250px',
            width: '70%',
            marginTop: '300px',
          }}
        ></div>
        <div className="main-img-box1">
          <img
            src="/static/img1.png"
            alt=""
            style={{
              width: '100%',
              borderRadius: '5px',
              boxShadow: '-1px 5px 18px 0px rgba(0,0,0,0.75)',
            }}
          />
          <div className={classes.whiteText}>
            <span style={{ color: '#ff7b00' }}>01. </span>대충 문제를 이런식으로
            풀어볼수 있다는걸 보여주자
          </div>
        </div>
      </div>
      <div className={classes.row1}>
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#313131',
            height: '250px',
            width: '70%',
            marginTop: '300px',
            right: '1px',
          }}
        ></div>
        <div className="main-img-box2">
          <img
            src="/static/duck.png"
            alt=""
            style={{
              position: 'absolute',
              height: '100%',
              borderRadius: '5px',
              boxShadow: '-1px 5px 18px 0px rgba(0,0,0,0.75)',
            }}
          />
          <div
            className={classes.text2}
            style={{
              position: 'relative',
              width: '450px',
              top: '300px',
              right: '-420px',
              color: 'white',
              fontSize: '25px',
              fontWeight: 600,
            }}
          >
            <span style={{ color: '#ff7b00' }}>01. </span>대충 문제를 이런식으로
            풀어볼수 있다는걸 보여주자
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSuccess;
