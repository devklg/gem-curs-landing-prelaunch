import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Smooth scrolling for the "Explore the Opportunity" button
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('a[href="#opportunity"]')?.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('#opportunity')?.scrollIntoView({ behavior: 'smooth' });
    });
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
