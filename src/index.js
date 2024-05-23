// import React from 'react';
// import ReactDOM from 'react-dom';
// import Tetris from './Tetris'; // Assuming Tetris component is located in Tetris.js

// ReactDOM.render(
//   <React.StrictMode>
//     <Tetris />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// index.js

// import React from 'react';
// import ReactDOM from 'react-dom';
// import Tetris from './Tetris'; // Assuming your main component is named App

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Tetris />
//   </React.StrictMode>
// );

// index.js

import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import Tetris from './Tetris'; // Assuming your main component is named App
// import BackgroundMusic from './Background-Music';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BackgroundMusic /> */}
    {/* <audio id="audio" loop autoPlay> 
      <source src="/public/background-music.wav" type="audio/mpeg" />
    </audio> */}
    <Tetris />
  </React.StrictMode>
);

