import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { increaseLevelApi, decreaseLevelApi } from '../../api/problem';
import { useDispatch } from 'react-redux';
import { getUserLevelProb } from '../../reducers/userLevelProb';
const useStyle = makeStyles({
  container: {
    padding: '0 20px 20px 20px',
  },
});

const ChangeLevel = ({ close, prob_level }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const increase = async () => {
    const redirect = await increaseLevelApi();
    if (redirect) {
      close();
      dispatch(getUserLevelProb());
    } else {
      alert('서버에 장애가 있습니다. 잠시후 다시 시도해 주세요.');
    }
  };
  const decrease = async () => {
    const redirect = await decreaseLevelApi();
    if (redirect) {
      close();
      dispatch(getUserLevelProb());
    } else {
      alert('서버에 장애가 있습니다. 잠시후 다시 시도해 주세요.');
    }
  };

  return (
    <div className={classes.container}>
      <h2>난이도 조정이 필요하신가요?</h2>
      <div>
        <span>현재 난이도 </span>
        <span>{prob_level}</span>
      </div>
      <Button
        color="primary"
        variant="contained"
        style={{ marginRight: '10px' }}
        onClick={decrease}
      >
        내리기
      </Button>
      <Button color="secondary" variant="contained" onClick={increase}>
        올리기
      </Button>
    </div>
  );
};

export default ChangeLevel;
