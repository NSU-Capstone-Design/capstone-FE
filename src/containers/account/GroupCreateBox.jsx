import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { group_create } from '../../reducers/account/groupCreate';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  txtContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  titleBox: {
    borderRadius: '10px',
    width: 'calc(100% - 20px)',
    height: '40px',
    margin: '39px 10px 1px 10px',
    border: 'solid #898989 1px',
    outline: 0,
  },
  introduceBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    width: 'calc(100% - 20px)',
    height: '200px',
    margin: '39px 10px 1px 10px',
    border: 'solid #898989 1px',
    outline: 0,
  },
  introduce: {
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 20px)',
    resize: 'none',
    border: 'none',
    outline: 0,
  },
  statusStyle: {
    display: 'flex',
    fontSize: '8pt',
    color: 'red',
    width: 'calc(100% - 20px)',
  },
  visibleContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 'calc(100% - 30px)',
    height: '40px',
    marginLeft: '10px',
  },
  buttonContainer: {
    borderBottom: 'solid 1px #b7b7b7',
    marginBottom: '15px',
    width: '100%',
  },
  buttonBox: {
    borderRadius: '10px',
    width: 'calc(100% - 18px)',
    height: '42px',
    margin: '40px 10px 50px 10px',
    backgroundColor: '#fd8083',
    color: 'white',
    border: 'none',
    outline: 0,
  },
  signUpContainer: {
    marginTop: '15px',
    fontSize: '10pt',
  },
});

const LoginBox = () => {
  const classes = useStyle();
  const [group_name, setId] = useState('');
  const [introduce, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();
  const titleInputHandler = (e) => setId(e.target.value);
  const introduceInputHandler = (e) => setPassword(e.target.value);
  const visibleInputHandler = (e) => setVisible(e.target.value);
  const groupCreateHandler = () => {
    const data = {
      group_name: group_name,
      introduce: introduce,
      group_visible: visible,
    };
    dispatch(group_create(data));
  };
  return (
    <div className={classes.mainContainer}>
      <div className={classes.txtContainer}>
        <input
          className={classes.titleBox}
          type="text"
          value={group_name}
          onChange={titleInputHandler}
          placeholder="그룹명"
        />
        <div className={classes.introduceBox}>
          <textarea
            className={classes.introduce}
            type="text"
            value={introduce}
            onChange={introduceInputHandler}
            placeholder="그룹 소개"
          />
        </div>
      </div>
      <div className={classes.visibleContainer}>
        <label htmlFor="visible">비공개 : </label>
        <input type="checkbox" value={visible} onChange={visibleInputHandler} />
      </div>
      <div className={classes.buttonContainer}>
        <button className={classes.buttonBox} onClick={groupCreateHandler}>
          생성
        </button>
      </div>
    </div>
  );
};

export default LoginBox;
