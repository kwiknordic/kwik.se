import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/universal.css';
import "./css/media.css";
import App from './App';

const root = ReactDOM.createRoot(document.querySelector("body"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);