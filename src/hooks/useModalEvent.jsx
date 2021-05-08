import React, { useState } from 'react';
import ModalEvent from '../components/others/ModalEvent';

export default function (initialState) {
  const [state, setState] = useState(initialState);
  const open = () => {
    setState(true);
    window.document.getElementById('root')?.classList.add('fixWindow');
  };
  const close = () => {
    setState(false);
    window.document.getElementById('root')?.classList.remove('fixWindow');
  };
  return [state, setState, open, close, ModalEvent];
}
