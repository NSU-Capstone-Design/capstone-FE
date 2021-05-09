import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { check_token } from '../api/account';
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
});

const Search = () => {
  const loginState = useSelector((state) => state.account.status);

  const dispatch = useDispatch();
  useEffect(async () => {
    const res = await check_token();
    if (res === 200) {
      dispatch(success_check());
    } else {
      console.log('로그인 창으로'); // 또는 에러 안내
    }
  }, []);
  const classes = useStyles();

  const [prob, setProb] = useState([]);
  useEffect(async () => {
    await baseApi.get('/problem/').then(({ data }) => setProb(data));
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const probsPerPage = 10;
  const pagesVisited = pageNumber * probsPerPage;
  const displayProbs = prob
    .slice(pagesVisited, pagesVisited + probsPerPage)
    .map((probs) => {
      return (
        <TableRow key={probs.id}>
          <TableCell component="th" scope="row">
            {probs.prob_num}
          </TableCell>
          <Link to={`problem/${probs.prob_num}`} align="right">
            {probs.title}
          </Link>
          <TableCell align="right">{probs.correct_people}</TableCell>
          <TableCell align="right">{probs.submission}</TableCell>
          <TableCell align="right">{probs.correct_answer_rate}</TableCell>
        </TableRow>
      );
    });
  const pageCount = Math.ceil(prob.length / probsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>문제 번호</TableCell>
              <TableCell align="right">제목</TableCell>
              <TableCell align="right">맞은 사람</TableCell>
              <TableCell align="right">제출</TableCell>
              <TableCell align="right">정답 비율</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{displayProbs}</TableBody>
        </Table>
      </TableContainer>
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={classes.paginationBttns}
      />
    </>
  );
};

export default Search;
