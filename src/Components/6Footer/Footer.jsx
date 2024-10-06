/* eslint-disable no-unused-vars */
import React from "react";
import twitter from "../../assets/twitter1.svg";
import instagram from "../../assets/instagrams.gif";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="bottom">
        <div>
          <h4 className="footer-h4">Community</h4>
          <div className="footer-link">
            <a
              href="https://github.com/RayOmiyi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="https://www.instagram.com/sasakosaomiyi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://x.com/omiyi_ray"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
      <p>Built by Ray</p>
    </div>
  );
};

export default Footer;

