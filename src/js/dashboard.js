import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './components/Dashboard.js';

import '../css/dashboard.css';

ReactDOM.createRoot( document.getElementById( 'swise-dashboard' ) ).render(
    <React.StrictMode>
        <Dashboard />
    </React.StrictMode>,
)