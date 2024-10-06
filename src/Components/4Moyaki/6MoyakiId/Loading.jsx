/* eslint-disable no-unused-vars */
import React from 'react';
import authur from '../../../assets/aurthur.mp4';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <video src={authur} className="authur" autoPlay loop></video>
    </div>
  );
};

export default Loading;
