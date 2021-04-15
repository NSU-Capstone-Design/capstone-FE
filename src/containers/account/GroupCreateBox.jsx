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
  txtBox: {
    borderRadius: '10px',
    width: 'calc(100% - 20px)',
    height: '40px',
    margin: '39px 10px 1px 10px',
    border: 'solid #898989 1px',
    outline: 0,
  },
  statusStyle: {
    display: 'flex',
    fontSize: '8pt',
    color: 'red',
    width: 'calc(100% - 20px)',
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
    margin: '40px 10px 100px 10px',
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
    <div>
      <div>
        <input
          type="text"
          id="id"
          value={group_name}
          onChange={titleInputHandler}
          placeholder="그룹명"
        />
        <input
          type="text"
          id="pw"
          value={introduce}
          onChange={introduceInputHandler}
          placeholder="그룹 소개"
        />
      </div>
      <div>
        <label htmlFor="visible">비공개 : </label>
        <input type="checkbox" onChange={visibleInputHandler} />
      </div>
      <div>
        <button onClick={groupCreateHandler}>생성</button>
      </div>
    </div>
  );
};

export default LoginBox;
