import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
<<<<<<< HEAD
import { classNames } from 'classnames';
=======
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
>>>>>>> 71feec4 (메인 서비스 완료)
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
    cursor: 'pointer',
  },
});

const Modal = ({ children, close, state }) => {
  const classes = useStyle();
  return (
    <>
      {state ? (
        <div className={classes.modalContainer}>
          <div onClick={close} className={classes.background}></div>
          <div className={classes.modalBox}>
            <HighlightOffRoundedIcon
              color="disabled"
              onClick={close}
              style={{ cursor: 'pointer' }}
            />
            {children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
