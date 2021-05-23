import React, { useState, useEffect } from 'react';
import { Button, OutlinedInput, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { check_token, FRONT_BASE_URL } from '../api/account';
import { useDispatch, useSelector } from 'react-redux';
import { success_check } from '../reducers/account/authenticate';
import { baseApi } from '../api/axiosApi';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: '#fd8083',
  },
  paginationBttns: {
    display: 'flex',
    width: '80%',
    height: '40px',
    justifyContent: 'center',
    listStyle: 'none',
    cursor: 'pointer',
    '& a': {
      padding: '10px',
      margin: '8px',
      borderRadius: '5px',
      border: '1px solid #fd8083',
      color: '#fd8083',
      cursor: 'pointer',
    },
  },
  newBtnDiv: {
    margin: '20px 20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerBox: {
    margin: '20px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    marginLeft: '20px',
    width: '250px',
    height: '40px',
  },
  searchBtn: {
    marginLeft: '20px',
    height: '40px',
  },
});

function displayedAt(createdAt) {
  const milliSeconds = new Date() - createdAt;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}

const writeNewPost = () => {
  window.location.href = FRONT_BASE_URL + '/question/write';
};

const Question = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.account.status);
  const classes = useStyles();
  const [post, setPost] = useState([{ total_page: 1 }]);
  const [pageNumber, setPageNumber] = useState(0);

  const pageCount = post[0].total_page;
  const $searchKeyword = document.getElementById('searchKeyword');

  useEffect(async () => {
    await baseApi
      .get('/question/getlist/?page=1')
      .then(({ data }) => setPost(data));
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    }
  }, []);

  const displayList = post.slice(1).map((post, idx) => {
    if (post.content !== undefined) {
      post.fromDate = displayedAt(new Date(post.created_at));
    }
    return (
      <TableRow key={post.id}>
        <TableCell component="th" scope="row">
          {post.prob_num}
        </TableCell>
        <TableCell align="center">
          <Link to={`question/${post.id}`}>{post.subject}</Link>
        </TableCell>
        <TableCell align="right">{post.nickname}</TableCell>
        <TableCell align="right">{post.fromDate}</TableCell>
        <TableCell align="right">{post.post_hit}</TableCell>
      </TableRow>
    );
  });

  const changePage = async ({ selected }) => {
    if (typeof selected === 'undefined') {
      selected = '0';
    }
    let requestURL = '/question/getlist/?page=' + (parseInt(selected) + 1);

    let keyword = $searchKeyword.value;
    if (keyword) {
      requestURL += '&keyword=' + keyword;
    }

    setPost([{ total_page: 0 }]);
    await baseApi.get(requestURL).then(({ data }) => setPost(data));
    setPageNumber(selected);
  };

  return (
    <>
      <Header loginState={loginState} />
      <div id="questions" style={{ marginTop: '60px' }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>문제 번호</TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="right">작성자</TableCell>
                <TableCell align="right">작성일</TableCell>
                <TableCell align="right">조회</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{displayList}</TableBody>
          </Table>
        </TableContainer>
        {loginState === 'success' && (
          <div className={classes.newBtnDiv}>
            <Button color="primary" variant="contained" onClick={writeNewPost}>
              새글쓰기
            </Button>
          </div>
        )}
        <div className={classes.footerBox}>
          <ReactPaginate
            previousLabel={'이전'}
            nextLabel={'다음'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={classes.paginationBttns}
          />
          <div id="searchArea">
            <OutlinedInput
              placeholder="검색어"
              id="searchKeyword"
              color="primary"
              className={classes.searchBox}
            />
            <Button
              color="secondary"
              variant="contained"
              className={classes.searchBtn}
              onClick={changePage}
            >
              검색
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
