/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import monads from "../../../assets/monad_data";
import { Link } from "react-router-dom";

const MonadSpotlight3 = () => {
  const competitionsToShow = ["competition 9 - Monad phone wallpaper"];
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
            <div className="articles-layout">
              {/* Content Section */}
              <div className="articles-content-monadspotlight">
                <p className="competition-sections">{competition}</p>
                <p className="descriptions">
                  Transform your phone screen into a vibrant showcase of monad
                  creativity! This competition showcases Monad themed mobile
                  wallpapers with bold colors and dynamic designs, perfectly
                  capturing the spirit of innovation and artistry that defines
                  the Moyaki community.
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

export default MonadSpotlight3;
