import React from 'react';
import { makeStyles } from '@material-ui/core';
import Subpage from '../pages/SubPage';
import { Link } from 'react-router-dom';

//CSS
const useStyle = makeStyles({
  header: {
    backgroundColor: '#c1c1c1',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#ffa5a5',
    height: 'calc(100vh - 60px)',
    display: 'flex',
    justifyContent: 'center',
  },
  headerContent: {
    width: '1080px',
    backgroundColor: '#ffcf8e',
    height: '100%',
    display: 'flex',
  },
  headLeft: {
    width: '50%',
    height: '100%',
    backgroundColor: '#9eff9e', //연두
  },
  headRight: {
    width: '50%',
    height: '100%',
    backgroundColor: '#8afbff', //하늘
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: '90%',
  },
  InnerContainer: {
    width: '1080px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Item1: {
    fontSize: '80px',
    color: 'white',
    marginTop: '20px',
    marginBottom: '20px',
  },
  Item2: {
    color: 'white',
    marginTop: '20px',
    marginBottom: '50px',
  },
  Item3: {
    display: 'flex',
  },
  Input: {
    width: '700px',
    height: '30px',
    marginRight: '100px',
  },
  Search: {
    display: 'flex',
    backgroundColor: 'blue',
  },
  Text: {
    backgroundColor: 'white',
    height: '35px',
  },
});

//HTML
const SubPage = () => {
  const classes = useStyle();
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.headerContent}>
          <div className={classes.headLeft}>
            <div className={classes.logo}>
              <img
                src="/static/logo.png"
                alt="사진있던곳"
                style={{ height: '100%' }}
              />
            </div>
          </div>
          <div className={classes.headRight}>
            <div className={classes.headRightItem}>HOME</div>
            <div className={classes.headRightItem}>사업자등록번호</div>
            <div className={classes.headRightItem}>법인등록번호</div>
            <div className={classes.headRightItem}>상호명으로등록</div>
            <div className={classes.headRightItem}>고객문의</div>
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.InnerContainer}>
          <div className={classes.Item1}>사업자등록번호</div>
          <div className={classes.Item2}>사업자등록번호_사업자정보</div>
          <div className={classes.Item3}>
            <input className={classes.Input} placeholder="검색 ㄱㄱ"></input>
            <Link to="/" className={classes.Search}>
              <div className={classes.Icon}>
                <img
                  src="/static/duck.png"
                  alt="돋"
                  style={{ height: '35px' }}
                />
              </div>
              <div className={classes.Text}>검색</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPage;
