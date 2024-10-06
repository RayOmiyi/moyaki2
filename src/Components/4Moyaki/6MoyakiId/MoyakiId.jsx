/* eslint-disable no-irregular-whitespace */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import monad_data from "../../../assets/monad_data";
import Certificate from "./Certificate";
import MediaModal from "./MediaModal"; // Import the new Modal component
import "./Moyakiid.css";

const MoyakiId = () => {
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null); // To store the clicked image or video

  // Find the selected card based on the id
  const selectedCard = monad_data.find((card) => String(card.id) === id);

  // If the card is not found, show an error or fallback UI
  if (!selectedCard) {
    console.log("Card not found with id:", id); // Debugging
    return <div className="Moyaki-id error">Card not found.</div>;
  }

  // Open modal with selected media (image or video)
  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setModalOpen(true);
  };

  // Find related cards based on the same name
  const relatedCards = monad_data.filter(
    (card) => card.name === selectedCard.name && card.id !== selectedCard.id
  );

  return (
    <div className="Moyaki-id">
      {/* Personal Art Section */}
      <div className="Moyaki-personal">
        <div
          className="Moyaki-visual"
          onClick={() => handleMediaClick(selectedCard)}
        >
          {selectedCard.video ? (
            <video loop muted autoPlay className="Moyaki-visuals">
              <source src={selectedCard.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={selectedCard.image}
              alt={selectedCard.name}
              className="Moyaki-visuals"
            />
          )}
        </div>
        <div className="Moyaki-content">
          <h1 className="Moyaki-name">{selectedCard.name}</h1>
          <h5 className="Moyaki-competition">
            {selectedCard.competition || "Mission Completed"}
          </h5>
          <p className="Moyaki-desc">
           The Artist{" "}
            {selectedCard.name} delivers a remarkable interpretation of {" "}
            {selectedCard.competition}, embodying the spirit of Monad with
            <span className="status-wrapper">
              <img
                src={selectedCard.status}
                alt={`${selectedCard.name}'s status`}
                className="status-icon"
              />
            </span>
            . Known for constantly challenging artistic norms,{" "}
            {selectedCard.name} continues to elevate their craft. This work,
            like much of their portfolio, not only captures attention but
            invites deeper reflection and connection with its
            thought-provoking visuals.
          </p>
          <h3 className="Moyaki-status">
            Status:{" "}
            <span>
              <img src={selectedCard.status} alt={selectedCard.name} />
            </span>
          </h3>
          <a href={selectedCard.link} target="_blank" rel="noopener noreferrer">
            <button className="btn view-btn">View on X</button>
          </a>
          {/* Render the Certificate component */}
          <Certificate
            name={selectedCard.name}
            competition={selectedCard.competition}
          />
        </div>
      </div>

      {/* Modal to display full image/video */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        media={selectedMedia}
      />

      {/* Related Arts Section */}
      {relatedCards.length > 0 && (
        <div className="related-arts">
          <h2>Related Art(s)</h2>
          <div className="related-cards-container">
            {relatedCards.map((card) => (
              <Link key={card.id} to={`/moyakiid/${card.id}`}>
                <div className="related-card">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="related-card-image"
                  />
                  <h4>{card.name}</h4>
                  <p>{card.competition}</p>
                  <a href={card.link} target="_blank" rel="noopener noreferrer">
                    <button className="btn related-btn">View on X</button>
                  </a>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoyakiId;
