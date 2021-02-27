import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';

const useStyles = makeStyles({});

const Group = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div>그룹 탐색</div>
    </>
  );
};

export default Group;
