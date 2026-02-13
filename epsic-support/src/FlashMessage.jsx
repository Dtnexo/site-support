import React from 'react';
import './FlashMessage.css';

function FlashMessage({ message, type }) {
    
    if (!message) return null;

    return (
        <div className={`flash-container ${type === 'error' ? 'flash-error' : 'flash-success'}`}>
            {message}
        </div>
    );
}

export default FlashMessage;