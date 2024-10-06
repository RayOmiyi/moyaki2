/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import michael from '../assets/michael.jpg';
import './music.css';

const MusicConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Do you want to listen to "Monad-Community First" by Michael Livingston?</h2>
        <div className="buttonContainer">
          <img src={michael} alt="Michael Livingston" className='michael' />
          <div className="actionButtons">
            <button onClick={onConfirm} className="btn confirmBtn">Yes</button>
            <button onClick={onCancel} className="btn cancelBtn">No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicConfirmationModal;
