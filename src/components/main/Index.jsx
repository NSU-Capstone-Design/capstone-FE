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
    fontSize: '55px',
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
    marginTop: '150px',
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
    position: 'absolute',
    left: '-850px',
    top: '400px',
    marginTop: '10px',
    color: 'white',
    fontSize: '50px',
    fontWeight: 600,
  },
  whiteText2: {
    position: 'absolute',
    left: '-500px',
    top: '200px',
    marginTop: '10px',
    color: 'white',
    fontSize: '50px',
    fontWeight: 600,
  },
  detailText1: {
    position: 'absolute',
    left: '-780px',
    top: '480px',
    marginTop: '10px',
    color: 'white',
    fontSize: '20px',
    fontWeight: 300,
  },
  detailText2: {
    position: 'absolute',
    left: '-780px',
    top: '520px',
    marginTop: '10px',
    color: 'white',
    fontSize: '20px',
    fontWeight: 300,
  },
  detailText3: {
    position: 'relative',
    width: '450px',
    top: '280px',
    right: '-870px',
    color: 'white',
    fontSize: '20px',
    fontWeight: 300,
  },
  detailText4: {
    position: 'relative',
    width: '450px',
    top: '300px',
    right: '-870px',
    color: 'white',
    fontSize: '20px',
    fontWeight: 300,
  },
  detailText5: {
    position: 'relative',
    width: '450px',
    top: '-200px',
    right: '420px',
    color: 'white',
    fontSize: '20px',
    fontWeight: 300,
  },
  detailText6: {
    position: 'relative',
    width: '450px',
    top: '-180px',
    right: '420px',
    color: 'white',
    fontSize: '20px',
    fontWeight: 300,
  },
});

const LoginSuccess = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <div className={classes.videoWrap}>
        <div className={classes.blackCover}>
          <div className={classes.text}>하루에 한문제씩</div>
          <div className={classes.text}>오늘의 문제</div>
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
            backgroundColor: '#595E68',
            height: '400px',
            width: '70%',
            marginTop: '300px',
          }}
        ></div>
        <div className="main-img-box1">
          <img
            src="/static/test_page.png"
            alt=""
            style={{
              width: '120%',
              borderRadius: '5px',
              boxShadow: '-1px 5px 18px 0px rgba(0,0,0,0.75)',
            }}
          />
          <div className={classes.whiteText}>
            <span style={{ color: '#ff7b00' }}>01. </span>하루에 한문제씩
            <span style={{ color: '#FE8282' }}> 오늘의 문제!</span>
          </div>
          <div className={classes.detailText1}>
            <span style={{ color: '#ff7b00' }}></span>하루에 한문제씩 수준별로
            추천되는 문제를 풀며
          </div>
          <div className={classes.detailText2}>
            <span style={{ color: '#ff7b00' }}></span> 알고리즘 실력을
            높여보세요
          </div>
        </div>
      </div>
      <div className={classes.row1}>
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#313131',
            height: '400px',
            width: '70%',
            marginTop: '200px',
            right: '1px',
          }}
        ></div>
        <div className="main-img-box2">
          <img
            src="/static/group_pages.png"
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
              top: '250px',
              right: '-780px',
              color: 'white',
              fontSize: '50px',
              fontWeight: 600,
            }}
          >
            <span style={{ color: '#ff7b00' }}>02. </span>그룹 생성
          </div>
          <div className={classes.detailText3}>
            <span style={{ color: '#ff7b00' }}></span> 그룹 생성후 인원들을
            초대하여
          </div>
          <div className={classes.detailText4}>
            <span style={{ color: '#ff7b00' }}></span> 원하는 인원들과 소통할 수
            있습니다
          </div>
        </div>
        <div className={classes.row1}>
          <div
            style={{
              backgroundColor: '#5B5A82',
              height: '600px',
              width: '100%',
              marginTop: '400px',
            }}
          ></div>
          <div className="main-img-box1">
            <img
              src="/static/question.png"
              alt=""
              style={{
                width: '70%',
                borderRadius: '5px',
                boxShadow: '-1px 5px 18px 0px rgba(0,0,0,0.75)',
              }}
            />
            <div className={classes.whiteText2}>
              <span style={{ color: '#ff7b00' }}>03. </span>질문게시판
            </div>
            <div className={classes.detailText5}>
              <span style={{ color: '#ff7b00' }}></span>코딩 중 모르는 문제가
              있다면
            </div>
            <div className={classes.detailText6}>
              <span style={{ color: '#ff7b00' }}></span> 질문하기를 눌러
              바로바로 질문해보세요!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSuccess;
