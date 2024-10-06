/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './confirmation.css'; // Import the CSS file

const ConfirmationModal = ({ isOpen, onConfirm, onCancel,name }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='modal-h2'>Are you sure you want to download {name} certificate?</h2>
        <div className="button-container">
          <button onClick={onConfirm} className="button">Yes</button>
          <button onClick={onCancel} className="button">No</button>
        </div>
      </div>
    </div> 
  );
};

export default ConfirmationModal;
 