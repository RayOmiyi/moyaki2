/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import monads from "../../../assets/monad_data";
import { Link } from "react-router-dom";

const MonadSpotlight4 = ({ reverseLayout }) => {
  const competitionsToShow = ["competition 13 - Monanimals"];
  const [displayedMonads, setDisplayedMonads] = useState([]);
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => {
    const groupedMonads = competitionsToShow
      .map((competition) => ({
        competition,
        items: monads.filter((monad) => monad.competition === competition),
      }))
      .filter((group) => group.items.length > 0);

    setDisplayedMonads(groupedMonads);

    const initialIndexes = {};
    groupedMonads.forEach((group) => {
      initialIndexes[group.competition] = 0;
    });
    setCurrentIndexes(initialIndexes);

    // Flipping effect interval
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev); // Toggle flip state

      setCurrentIndexes((prev) => {
        const newIndexes = { ...prev };
        groupedMonads.forEach((group) => {
          if (group.items.length > 0) {
            newIndexes[group.competition] =
              (prev[group.competition] + 1) % group.items.length;
          }
        });
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {displayedMonads.map((group) => {
        const { competition, items } = group;
        const currentIndex = currentIndexes[competition] ?? 0;
        const nextIndex = (currentIndex + 1) % items.length;
        const currentItem = items[currentIndex];
        const nextItem = items[nextIndex];

        return (
          <article
            className="articles"
            key={`${competition}-${currentIndex}-${currentItem.id}`}
          >
            <div
              className={`articles-layout ${
                reverseLayout ? "reverse-layout" : ""
              }`}
            >
              {/* Content Section */}
              <div className="articles-content-monadspotlight">
                <p className="competition-sections">{competition}</p>
                <p className="descriptions">
                  Explore the wild world of Monanimals with a visually stunning
                  showcase of the most untamed creatures in the Monadverse! From
                  everyone’s favorite, Moyaki, to fan-made renditions, we bring
                  you closer to the action than ever before. Whether you're a
                  wildlife enthusiast or simply curious about Monad's most
                  spectacular species, there’s something here for everyone!
                </p>

                <Link
                  to={`/moyaki?competition=${encodeURIComponent(competition)}`}
                >
                  <button className="button-hero">View Competition</button>
                </Link>
              </div>

              {/* Stack of cards */}
              <div className="frame-container-monadspotlight">
                <div
                  className={`hero-cards-monadspotlight ${
                    isFlipped ? "flipped-monadspotlight" : ""
                  }`}
                >
                  {/* Background card with the next image */}
                  <div
                    className="hero-card-background-monadspotlight"
                    style={{ backgroundImage: `url(${nextItem.image})` }}
                  />
                  {/* Current card with the current image */}
                  <div className="hero-card-monadspotlight">
                    <img src={currentItem.image} alt="Current" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default MonadSpotlight4;
