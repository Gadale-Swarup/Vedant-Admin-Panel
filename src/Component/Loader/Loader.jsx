import React from 'react';
import './Loader.scss';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="loader-message">{message}</p>
    </div>
  );
};

export default Loader; 