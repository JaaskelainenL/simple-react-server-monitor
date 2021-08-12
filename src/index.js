// A simple frontend for my react based system monitor
// It shows the CPU temperature, Ram usage and the uptime of the server being connected to

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



// All the magic happens in App.JS
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
