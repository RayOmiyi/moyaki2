/* eslint-disable no-unused-vars */
import React from "react";
import moyakihero from "../../../assets/moyaki-hero.mp4";
import "./Monad.css";
import { Link } from "react-router-dom";

const MonadHero = () => {
  return (
    <div className="Monad-container">
      <video
        src={moyakihero}
        autoPlay
        loop
        muted
        className="Monad-video"
      ></video>
      <div className="Monad-overlay">
        <h3 className="Monad-h3">Welcome to the House of Moyaki</h3>
        <h6 className="Monad-h6">
          Step into Moyaki, where tradition meets innovation and community<br/>
          thrives. We celebrate togetherness, fostering creativity, growth, and<br/>
          shared experiences. Regardless of art style, the House of Moyaki<br/>
          offers space for connection, exploration, and collective dreams.
        </h6>
      </div>
      <div className="Monad-leader">
        <Link to={"/leaderboard"}>
          <button className="btn">Visit LeaderBoard</button>
        </Link>
      </div>
    </div>
  );
};

export default MonadHero;
