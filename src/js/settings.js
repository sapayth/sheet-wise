import React from 'react';
import ReactDOM from 'react-dom/client';
import Settings from './components/Settings.js';

import '../css/settings.css';

ReactDOM.createRoot( document.getElementById( 'swise-settings' ) ).render(
    <React.StrictMode>
        <Settings />
    </React.StrictMode>,
)
