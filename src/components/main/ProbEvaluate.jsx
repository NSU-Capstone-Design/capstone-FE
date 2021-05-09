import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { nextProbApi, passToNextProbApi } from '../../api/problem';
import { useDispatch } from 'react-redux';
import { getUserLevelProb } from '../../reducers/userLevelProb';
const useStyle = makeStyles({
  container: {
    padding: '0 20px 20px 20px',
  },
});

const ProbEvaluate = ({ close, prob_id }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const solved = async () => {
    const redirect = await nextProbApi(prob_id);
    if (redirect) {
      close();
      dispatch(getUserLevelProb());
    } else {
      alert('서버에 장애가 있습니다. 잠시후 다시 시도해 주세요.');
    }
  };
  const pass = async () => {
    const redirect = await passToNextProbApi(prob_id);
    if (redirect) {
      close();
      dispatch(getUserLevelProb());
    } else {
      alert(
        '서버에 장애가 있습니다. 잠시후 다시 시도해 주세요. (probEvaluate)'
      );
    }
  };

  return (
    <div className={classes.container}>
      <h2>오늘의 문제를 해결하셨나요?</h2>
      <p>풀이가 완료된 문제는 마이페이지에서 다시 한번 보실 수 있습니다.</p>
      <Button
        color="primary"
        variant="contained"
        style={{ marginRight: '10px' }}
        onClick={solved}
      >
        문제 풀이를 완료하였습니다.
      </Button>
      <Button color="secondary" variant="contained" onClick={pass}>
        다른 문제를 먼저 풀어보고 싶습니다.
      </Button>
    </div>
  );
};

export default ProbEvaluate;
