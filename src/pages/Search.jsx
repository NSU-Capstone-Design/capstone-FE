import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';

const useStyles = makeStyles({});

const Search = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div>문제 검색하기</div>
    </>
  );
};

export default Search;
