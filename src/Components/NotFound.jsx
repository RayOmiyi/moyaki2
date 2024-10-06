/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Importing the CSS file for styling

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="content">
        <h1 className='.h1'>404</h1>
        <h2 className='.h2'>Oops! Page Not Found</h2>
        <p className='.p'>We can't seem to find the page you're looking for.</p>
        <Link to="/" className="back-home-link">Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
