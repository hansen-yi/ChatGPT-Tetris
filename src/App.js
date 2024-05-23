// App.js or index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Tetris from './Tetris';
import BackgroundMusic from './Background-Music';

ReactDOM.render(
  <React.StrictMode>
    <BackgroundMusic />
    <Tetris />
  </React.StrictMode>,
  document.getElementById('root')
);