/* eslint-disable no-irregular-whitespace */
import "./FeaturedArt.css";
import monads from "../../../assets/monad_data"; // Your existing data import
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import z344 from "../../../assets/z344new.png";
import z395 from "../../../assets/z397new.png";
const FeaturedArt = () => {
  const competitionsToShow = [
    "competition 10 - Friend of Moyaki",
    "competition 8 - friend from Monad.",
    "competition 12 - Friend in Moyaki",
  ];

  const [displayedMonads, setDisplayedMonads] = useState([]);
  const [currentIndexes, setCurrentIndexes] = useState({}); // Track current image index for each competition

  useEffect(() => {
    // Group monads by competition
    const groupedMonads = competitionsToShow
      .map((competition) => ({
        competition,
        items: monads.filter((monad) => monad.competition === competition),
      }))
      .filter((group) => group.items.length > 0);

    setDisplayedMonads(groupedMonads);

    // Initialize currentIndexes state for each competition
    const initialIndexes = {};
    groupedMonads.forEach((group) => {
      initialIndexes[group.competition] = 0; // Start with the first image for each competition
    });
    setCurrentIndexes(initialIndexes);

    // Set up an interval to change the images for each competition
    const interval = setInterval(() => {
      setCurrentIndexes((prev) => {
        const newIndexes = { ...prev };

        groupedMonads.forEach((group) => {
          if (group.items.length > 0) {
            newIndexes[group.competition] =
              (prev[group.competition] + 1) % group.items.length; // Rotate through images
          }
        });

        return newIndexes;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="section">
      <div className="section-container">
      <div className="corner-image middle-lefts">
        <img src={z344} alt="Top Left" className="side-image" />
      </div>
      <div className="corner-image middle-rights">
        <img src={z395} alt="Top Left" className="side-image" />
      </div>
      <h1 className="section-h1">for community, by community</h1>
      <p className="section-p">
        These art pieces capture the beauty of shared moments, mutual support,
        and collective creativity through vibrant collaborations and intimate
        portrayals of friendship. They celebrate the bonds that unite us and
        serve as powerful reminders of how deeply relationships shape our community
        and inspire our creativity.
      </p>
      <div className="contain">
        {displayedMonads.map((group) => {
          const { competition, items } = group;
          const currentIndex = currentIndexes[competition] ?? 0;
          const currentItem = items[currentIndex];
          
          return (
            <article className="article" key={competition}>
              {currentItem && (
                <>
                  <img
                    src={currentItem.image}
                    alt="image"
                    className="images-section"
                    />
                  <div className="content-wrapper">
                    <p className="competition-in">{competition}</p>
                    <Link
                      to={`/moyaki?competition=${encodeURIComponent(
                        competition
                      )}`}
                      >
                      <button className="button-hero">View Competition</button>
                    </Link>
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
        </div>
    </div>
  );
};

export default FeaturedArt;
