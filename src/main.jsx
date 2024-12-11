import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Router';
import './index.css';
import MyQueryClientProvider from './QueryClientProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MyQueryClientProvider>
            <AppRouter />
        </MyQueryClientProvider>
    </React.StrictMode>
);