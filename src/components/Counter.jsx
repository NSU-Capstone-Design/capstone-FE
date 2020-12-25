import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({});

const Counter = () => {
  const classes = useStyle();
  const [num, setNum] = useState(0);
  const addNumber = () => {
    setNum(num + 1);
  };
  const minusNumber = () => {
    setNum(num - 1);
  };
  return (
    <div>
      <div>couter</div>
      <div>{num}</div>
      <button onClick={minusNumber}>-</button>
      <button onClick={addNumber}>+</button>
    </div>
  );
};

export default Counter;
