import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {classNames} from 'classnames';
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
  trigger: {},
});

const Modal = ({ title, className, children }) => {
  const classes = useStyle();
  const trigger = classNames(className, classes.trigger);
  const [open, setOpen] = useState(false);
  const modalOpen = (e) => {
    setOpen(true);
    window.document.getElementById('root')?.classList.add('fixWindow');
  };
  const modalClose = () => {
    setOpen(false);
    window.document.getElementById('root')?.classList.remove('fixWindow');
  };
  return (
    <>
      <div onClick={modalOpen} className={trigger}>
        {title}
      </div>
      {open ? (
        <div className={classes.modalContainer}>
          <div onClick={modalClose} className={classes.background}></div>
          <div className={classes.modalBox}>{children}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
