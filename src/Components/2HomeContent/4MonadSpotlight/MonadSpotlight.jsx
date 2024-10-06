/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import "./MonadSpotlight.css";
import monads from "../../../assets/monad_data"; // Ensure the path is correct
import { Link } from "react-router-dom";
import MonadSpotlight2 from "./MonadSpotlight2";
import MonadSpotlight3 from "./MonadSpotlight3";
import MonadSpotlight4 from "./MonadSpotlight4";
import chog from "../../../assets/chog.png";
import z131 from "../../../assets/z131new.png";
import z60 from "../../../assets/z60new.png";
import z299 from "../../../assets/z299new.png";
import z303 from "../../../assets/z303new.png";
import z306 from "../../../assets/z306new.png";
import z420 from "../../../assets/z420new.png";
import z414 from "../../../assets/z414new.png";
import z421 from "../../../assets/z421new.png";
const MonadSpotlight = () => {
  const competitionsToShow = ["competition A - gmonad"];
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
    <div className="containers-monadspotlight">
      <div className="corner-image top-middle">
        <img src={z420} alt="Top Middle" className="side-image" />
      </div>
      <div className="corner-image top-left">
        <img src={z131} alt="Top Left" className="side-image" />
      </div>
      <div className="corner-image top-right">
        <img src={z60} alt="Top Right" className="side-image" />
      </div>
      <div className="corner-image middle-right">
        <img src={z306} alt="Middle Right" className="side-image" />
      </div>
      <div className="corner-image lower-middle-right">
        <img src={z414} alt="Middle Right" className="side-image" />
      </div>
      <div className="corner-image lower-middle-left">
        <img src={z421} alt="Middle Right" className="side-image" />
      </div>
      <div className="corner-image middle-left">
        <img src={z303} alt="Middle left" className="side-image" />
      </div>
      <div className="corner-image bottom-right">
        <img src={chog} alt="bottom right " className="side-image" />
      </div>
      <div className="corner-image bottom-left">
        <img src={z299} alt="bottom left " className="side-image" />
      </div>

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
                  Gmonad! The ultimate way to start your day in the Monadverse!
                  Whether you're about to conquer the blockchain or just vibing
                  with the latest creations, there's no better way to kick
                  things off! It’s more than just a greeting—it’s a way of life.
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
      <MonadSpotlight2 reverseLayout={true} />
      <MonadSpotlight3 />
      <MonadSpotlight4 reverseLayout={true} />
    </div>
  );
};

export default MonadSpotlight;
