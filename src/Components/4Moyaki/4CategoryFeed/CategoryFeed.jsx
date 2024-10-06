/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "./CategoryFeed.css";
import { Link } from "react-router-dom";

const CategoryFeed = ({ filteredData }) => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    }, {
      threshold: 0.1
    });

    cardRefs.current.forEach(card => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardRefs.current.forEach(card => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, [filteredData]);   

  return (
    <div className="Categoryfeed">  
      {filteredData.length === 0 ? (
        <p className="no-results">No results found.</p>
      ) : (
        filteredData.map(({ id, image, name, video, competition }, index) => (
          <div 
            key={id} 
            className="Categoryfeed-card" 
            ref={el => cardRefs.current[index] = el}
          >
            <Link to={`/moyakiid/${id}`}>
              {video ? (
                <video loop muted autoPlay controls className="Categoryfeed-video">
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={image} alt={name} className="Categoryfeed-img"  />
              )}
              <p className="Categoryfeed-p">
                {competition ? competition : " Mission Completed"}
              </p>
            </Link>
            {/* Render the external link outside the main Link tag */}
            {/* <a href={link} target="_blank" rel="noopener noreferrer" className="external-link">
              View Post
            </a> */}
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryFeed;

