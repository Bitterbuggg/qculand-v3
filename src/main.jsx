import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Avoid React.StrictMode because it mounts/unmounts <Canvas> twice in dev,
// which can trigger WebGL context loss in three.js.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
