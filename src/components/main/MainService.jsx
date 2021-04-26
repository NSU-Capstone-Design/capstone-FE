import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { userLevelProblemApi } from '../../api/problem';
import CodeMirror from '../../components/CodeMirror';
import Typography from '@material-ui/core/Typography';
import IOExam from './IOExam';

const useStyle = makeStyles({
  container: {
    display: 'flex',
    width: '100vw',
    height: 'calc(100vh - 60px)',
  },
  contentBox: {
    width: '50vw',
    height: 'calc(100vh - 60px)',
  },
  codeBox: {
    width: '50vw',
    height: 'calc(100vh - 60px)',
  },
});
const ioExamZip = (ioExams) => {
  const ioExamList = [];
  let ioExamSet = {
    input: {},
    output: {},
  };
  for (let io of ioExams) {
    if (io.is_input) {
      ioExamSet.input = io;
    } else {
      ioExamSet.output = io;
    }
    if (ioExamSet.input.io_num === ioExamSet.output.io_num) {
      ioExamList.push(ioExamSet);
      ioExamSet = {
        input: {},
        output: {},
      };
    }
  }
  return ioExamList;
};
const copy = (e, id) => {
  var tempElem = document.createElement('textarea');
  tempElem.value = document.getElementById(id).innerText;
  document.body.appendChild(tempElem);

  tempElem.select();
  document.execCommand('copy');
  document.body.removeChild(tempElem);
};
export default function () {
  const classes = useStyle();
  const [problem, setProblem] = useState({
    ioexam_set: [],
  });
  useEffect(async () => {
    const prob = await userLevelProblemApi();
    setProblem(prob);
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.contentBox}>
        <div>
          <div className={classes.head1}>문제</div>
          <Typography className={classes.instructions}>
            {problem.problem_content}
          </Typography>
          <div className={classes.head1}>입력</div>
          <Typography className={classes.instructions}>
            {problem.problem_input}
          </Typography>
          <div className={classes.head1}>출력</div>
          <Typography className={classes.instructions}>
            {problem.problem_output}
          </Typography>

          {ioExamZip(problem.ioexam_set).map((ioexam, index) => (
            <IOExam ioexam={ioexam} copy={copy} index={index} />
          ))}
        </div>
      </div>
      <div className={classes.codeBox}>
        <CodeMirror />
      </div>
    </div>
  );
}
