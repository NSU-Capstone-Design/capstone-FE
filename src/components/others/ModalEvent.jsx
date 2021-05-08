import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import '../../index.css';

const useStyle = makeStyles({
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 100,
  },
  modalBox: {
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid #bfbfbf',
    position: 'relative',
  },
  background: {
    backgroundColor: 'rgb(0,0,0,0.5)',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

const Modal = ({ children, close, state }) => {
  const classes = useStyle();
  return (
    <>
      {state ? (
        <div className={classes.modalContainer}>
          <div onClick={close} className={classes.background}></div>
          <div className={classes.modalBox}>{children}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
