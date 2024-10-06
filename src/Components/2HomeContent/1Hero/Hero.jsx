/* eslint-disable no-irregular-whitespace */
import { useEffect, useState } from "react";
import "./Hero.css";
import monad_data from "../../../assets/monad_data.js";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1); // Holds the next image index
  const [isFlipped, setIsFlipped] = useState(false); // State to track flip

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFlipped((prev) => !prev); // Toggle flip state
      setCurrentImage((prevIndex) => {
        const nextIndex = (prevIndex + 1) % monad_data.length;
        setNextImage((nextIndex + 1) % monad_data.length); // Set the next incoming image
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="hero">
      <div className="hero-small">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${monad_data[currentImage].image})`,
          }}
        />
        <div className="home-texts">
          <h2 className="home-hero">
          Discover the Art community of Monad

          </h2>
          <h4 className="home-sub">
          Explore hundreds of art pieces made by community members of one of the worlds biggest blockchains
          </h4>
          <div className="hero-btns">
            <Link to={"/moyaki"}>
              <button className="hero-btn">Explore Moyaki</button>
            </Link>
          </div>
        </div>

        {/* Add flipped class based on state */}
        <div className={`hero-cards ${isFlipped ? "flipped" : ""}`}>
          <div
            className="hero-card-background"
            style={{
              backgroundImage: `url(${monad_data[nextImage].image})`,
            }}
          />
          <div className="hero-card">
            <img src={monad_data[currentImage].image} alt="hero_main" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
