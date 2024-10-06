import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/1Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Moyaki from "./Pages/Moyaki/Moyaki";
import Contact from "./Pages/Contact/Contact";
import Footer from "./Components/6Footer/Footer";
import MoyakiId from "./Components/4Moyaki/6MoyakiId/MoyakiId";
import Leaders from "./Components/LeadersBoard/Leaders";
import Beginning from "./Components/Beginning/Beginning";
import community from './assets/community.mp3';
import MusicConfirmationModal from './Components/MusicConfirmationModal'; // Adjust the path as needed
import NotFound from "./Components/NotFound";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [audio] = useState(new Audio(community)); // Create an Audio object
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Function to handle when the Beginning component is done loading
  const handleLoadingEnd = () => {
    setIsHidden(true);
    setLoading(false); // Stop loading state immediately after Beginning is done
  };

  useEffect(() => {
    if (isMusicOn) {
      audio.loop = true;
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [audio, isMusicOn]);

  const handleMusicConfirm = () => {
    setIsMusicOn(true);
    setIsModalOpen(false);
  };

  const handleMusicCancel = () => {
    audio.pause();
    setIsMusicOn(false);
    setIsModalOpen(false);
  };

  const toggleMusic = () => {
    if (isMusicOn) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }
    setIsMusicOn((prev) => !prev);
  };

  const stopMusic = () => {
    audio.pause();
    setIsMusicOn(false);
  };

  return (
    <div className="App">
      {/* Pass the callback to handle when the Beginning component is done */}
      <Beginning onLoadingEnd={handleLoadingEnd} className={isHidden ? "hidden" : ""} />
      {/* Only show this content after the Beginning component finishes loading */}
      {!loading && (
        <>
          <MusicConfirmationModal
            isOpen={isModalOpen}
            onConfirm={handleMusicConfirm}
            onCancel={handleMusicCancel}
          />
          <Navbar toggleMusic={toggleMusic} isMusicOn={isMusicOn} stopMusic={stopMusic} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/moyaki" element={<Moyaki />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/moyakiid/:id" element={<MoyakiId />} />
            <Route path="/leaderboard" element={<Leaders />} />
            <Route path="*" element={<NotFound />} /> {/* This catches all unmatched routes */}
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
