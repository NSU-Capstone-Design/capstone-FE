import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/python/python';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/material.css';

const useStyle = makeStyles({
  codeMirrorBox: {
    width: '100%',
    height: '100%',
  },
  codemirror: {
    minHeight: '600px',
  },
});

const DEFAULT_PYTHON_VALUE =
  'import numpy as np \n\ndef solution():\n  # 작성을 시작해 봅시다.\n  return 0';

const options = {
  theme: 'dracula',
  autoCloseBrackets: true,
  cursorScrollMargin: 48,
  mode: 'python',
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  styleActiveLine: true,
};

const MyCodeMirror = () => {
  const [pyValue, setPyValue] = useState(DEFAULT_PYTHON_VALUE);
  const classes = useStyle();
  return (
    <div className={classes.codeMirrorBox}>
      <CodeMirror
        value={pyValue}
        options={options}
        onBeforeChange={(editor, data, value) => {
          setPyValue(value);
        }}
        onChange={(editor, data, value) => {}}
        editorDidMount={(editor) => {
          editor.setSize('', 'calc(100vh - 60px');
        }}
      />
    </div>
  );
};

export default MyCodeMirror;
