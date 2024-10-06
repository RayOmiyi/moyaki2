/* eslint-disable react/prop-types */
import  { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/MonadLogo.png";
import { IoBalloon } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";
import MusicConfirmationModal from "../MusicConfirmationModal";

const Navbar = ({ toggleMusic, isMusicOn, stopMusic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleMusic = () => {
    // Show modal before toggling the music state
    setShowModal(true);
  };

  const confirmToggleMusic = () => {
    toggleMusic(); // This will toggle the music state
    setShowModal(false);
  };

  return (
    <nav className="nav">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="Monad logo" />
        </Link>
        <div className="music-toggle">
          <label className="switch">
            <input type="checkbox" checked={isMusicOn} onChange={handleToggleMusic} />
            <span className="slider"></span>
          </label>
          <span>{isMusicOn ? " Music On" : " Music Off"}</span>
        </div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`links ${isOpen ? "active" : ""}`}>
        <Link to={"/moyaki"}>
          <li className="Link" style={{ color: "white" }}>
            <IoBalloon />
            Moyaki
          </li>
        </Link>
        <Link to={"/contact"}>
          <li className="Link" style={{ color: "white" }}>
            <FaAddressBook />
            Contact
          </li>
        </Link>
        <a
            href="https://www.monad.xyz/"
            target="_blank"
            rel="noopener noreferrer"
        >
           <li><button className="button">Visit Monad</button></li> 
        </a>
      </ul>
      <MusicConfirmationModal
        isOpen={showModal}
        onConfirm={confirmToggleMusic} // Call function to confirm music toggle
        onCancel={() => {
          stopMusic(); // Call stopMusic to pause the audio when "No" is clicked
          setShowModal(false); // Close the modal
        }}
      />
    </nav>
  );
};

export default Navbar;
