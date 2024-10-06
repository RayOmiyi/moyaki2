/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import './Beginning.css';
const Beginning = ({ onLoadingEnd,className }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingEnd(); // Notify that loading is complete
    }, 4000); // Simulating loading time

    return () => clearTimeout(timer); // Clean up the timer
  }, [onLoadingEnd]);
  return (
    <div className={`orchid ${className}`}>
      <div className="loading-containers"></div>
    </div>
  );
};

export default Beginning;
