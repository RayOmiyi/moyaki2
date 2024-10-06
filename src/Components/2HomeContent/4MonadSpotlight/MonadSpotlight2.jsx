/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import monads from "../../../assets/monad_data";
import { Link } from "react-router-dom";

const MonadSpotlight2 = ({ reverseLayout }) => {
  const competitionsToShow = ["competition 5 - Monad Meme Museum"];
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
                  Welcome to the Monad Meme Museum—where memes meet madness!
                  This is your ultimate hub for some of the funniest and most
                  creative memes circulating around Monad. But it’s more than
                  just fresh content—it’s a nostalgic throwback too. Many of the
                  memes playfully remix classic internet favorites, giving them
                  a Monad-themed spin.
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

export default MonadSpotlight2;
