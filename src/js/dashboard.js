import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './components/Dashboard.js';

ReactDOM.createRoot( document.getElementById( 'swise-dashboard' ) ).render(
    <React.StrictMode>
        <Dashboard />
    </React.StrictMode>,
)