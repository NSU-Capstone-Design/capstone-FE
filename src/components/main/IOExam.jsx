import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  ioContainer: {
    display: 'flex',
  },
  head1: {
    fontWeight: '700',
    margin: '5px 3px',
  },
  ioWrap: {
    display: 'inline-block',
    width: '50%',
  },
});

export default function ({ ioexam, copy, activeStep, index }) {
  const classes = useStyle();
  return (
    <div className={classes.ioContainer}>
      <div className={classes.ioWrap}>
        <div className={classes.head1}>
          {ioexam.input.is_input ? '입력 예제' : '출력 예제'}
          <span
            style={{
              fontWeight: 500,
              color: '#10a0ff',
              cursor: 'pointer',
              marginLeft: '5px',
            }}
            onClick={(e) => {
              copy(e, `io${activeStep}${index}1`);
            }}
          >
            복사
          </span>
        </div>
        <pre
          id={`io${activeStep}${index}1`}
          style={{
            width: '90%',
            boxSizing: 'border-box',
            margin: '3px 5px',
            padding: '10px',
            border: '1px solid #a9a9a9',
            overflowX: 'scroll',
          }}
        >
          {ioexam.input.value}
        </pre>
      </div>
      <div className={classes.ioWrap}>
        <div className={classes.head1}>
          {ioexam.output.is_input ? '입력 예제' : '출력 예제'}
          <span
            style={{
              fontWeight: 500,
              color: '#10a0ff',
              cursor: 'pointer',
              marginLeft: '5px',
            }}
            onClick={(e) => {
              copy(e, `io${activeStep}${index}2`);
            }}
          >
            복사
          </span>
        </div>
        <pre
          id={`io${activeStep}${index}2`}
          style={{
            width: '90%',
            boxSizing: 'border-box',
            margin: '3px 5px',
            padding: '10px',
            border: '1px solid #a9a9a9',
          }}
        >
          {ioexam.output.value}
        </pre>
      </div>
    </div>
  );
}
