import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { putLevelTestProb } from '../../api/levelTest';
import { getLTP } from '../../reducers/account/levelTestProbs';

export default function ({ ltpl, activeStep, close }) {
  const prob = ltpl[activeStep];
  const dispatch = useDispatch();
  const [grade, setGrade] = useState(prob.evaluation);
  const [h, setH] = useState(false);
  const [m, setM] = useState(false);
  const [l, setL] = useState(false);
  const setCheck = () => {
    if (grade === '상') {
      setH(true);
      setM(false);
      setL(false);
    }
    if (grade === '중') {
      setM(true);
      setH(false);
      setL(false);
    }
    if (grade === '하') {
      setL(true);
      setM(false);
      setH(false);
    }
  };
  useEffect(() => {
    setCheck();
  }, [grade]);
  const radioHandler = (e) => {
    setGrade(e.target.value);
  };
  const submit = async () => {
    await putLevelTestProb(grade, prob.id);
    dispatch(await getLTP());
    close();
  };
  return (
    <div onChange={radioHandler}>
      <div>문제 평가 ({prob.problem.title})</div>
      <div>
        <input type="radio" value="상" checked={h} />
        <label for="huey">완전히 풀수 있다.</label>
      </div>
      <div>
        <input type="radio" value="중" checked={m} />
        <label for="huey">
          어떤 방향으로 풀어야할지 설계는되지만 확신이 있지 않다.
        </label>
      </div>
      <div>
        <input type="radio" value="하" checked={l} />
        <label for="huey">건드릴수 없다.</label>
      </div>
      <button onClick={submit}>저장</button>
    </div>
  );
}
