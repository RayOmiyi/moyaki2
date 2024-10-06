/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti"; // Import the Confetti component
import "./Leaders.css";
import monad_data from "../../assets/monad_data"; // assuming this file imports the images
import bronze from "../../assets/bronze1.png";
import silver from "../../assets/silver1.png";
import gold from "../../assets/gold1.png";
import salute from "../../assets/salute1.png";

const Leaders = () => {
  const [leaderData, setLeaderData] = useState([]);
  const [confetti, setConfetti] = useState(false); // State to manage confetti display
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Process the data to count the number of gold, silver, bronze, and honorary mentions for each person
    const processedData = monad_data.reduce((acc, curr) => {
      const existing = acc.find((item) => item.name === curr.name);
      if (existing) {
        if (curr.status === gold) {
          existing.gold += 1;
        } else if (curr.status === silver) {
          existing.silver += 1;
        } else if (curr.status === bronze) {
          existing.bronze += 1;
        } else if (curr.status === salute) {
          existing.salute += 1;
        }
        existing.totalMedals += 1;
      } else {
        acc.push({
          id: curr.id,
          name: curr.name,
          gold: curr.status === gold ? 1 : 0,
          silver: curr.status === silver ? 1 : 0,
          bronze: curr.status === bronze ? 1 : 0,
          salute: curr.status === salute ? 1 : 0,
          totalMedals: 1,
          link: curr.link,
        });
      }
      return acc;
    }, []);

    // Calculate total points based on the medal counts
    const leadersWithPoints = processedData.map((leader) => {
      const totalPoints =
        leader.gold * 5 +
        leader.silver * 3 +
        leader.bronze * 2 +
        leader.salute * 1;
      return { ...leader, totalPoints };
    });

    // Sort the data by total points
    const sortedData = leadersWithPoints.sort(
      (a, b) => b.totalPoints - a.totalPoints
    );

    setLeaderData(sortedData.slice(0, 30));

    // Show confetti when the component mounts
    setConfetti(true);

    // Reset confetti state after a delay (to allow it to show for a moment)
    const timer = setTimeout(() => setConfetti(false), 6000); // Show for 6 seconds

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  // Helper function to extract the base profile URL
  const extractProfileLink = (link) => {
    const profileBaseUrl = link.split("/status")[0]; // Trim after /status
    return profileBaseUrl;
  };

  return (
    <div className="leader-container">
      {confetti && <Confetti width={width} height={height} />} {/* Render confetti if true */}
      <h4 className="leader-title">Leadership Board</h4>
      <h3 className="leader-points">
        Gold-5points, Silver-3points, Bronze-2points, HM-1point
      </h3>
      <ul className="leader-list">
        {leaderData.map((leader, index) => (
          <li key={leader.id} className="leader-item">
            <div className="leader-info">
              <span className="leader-rank">{index + 1}. </span>
              <span className="leader-name">{leader.name}</span>
              <a
                href={extractProfileLink(leader.link)} // Use the extracted profile link
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="button">X</button>
              </a>
            </div>
            <div className="leader-medals">
              <span className="medal gold">{leader.gold} Gold</span>
              <span className="medal silver">{leader.silver} Silver</span>
              <span className="medal bronze">{leader.bronze} Bronze</span>
              <span className="medal salute">{leader.salute} Honorary Mentions</span>
              <span className="total-medals">{leader.totalMedals} Medals</span>
              <span className="total-points">Total Points: {leader.totalPoints}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaders;
