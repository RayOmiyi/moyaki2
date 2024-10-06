/* eslint-disable react/prop-types */
import './MediaModal.css'; // Import your CSS file for modal styling

const MediaModal = ({ isOpen, onClose, media }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="media-modal-overlay" onClick={onClose}>
      <div className="media-modal-content" onClick={(e) => e.stopPropagation()}>
        {media.video ? (
          <video loop muted autoPlay className="modal-video">
            <source src={media.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={media.image} alt={media.name} className="modal-image" />
        )}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default MediaModal;
