import { useEffect, useState } from "react";
import MonadHero from "../../Components/4Moyaki/1MonadHero/MonadHero";
import Search from "../../Components/4Moyaki/2SearchBar/Search";
import CategoryFeed from "../../Components/4Moyaki/4CategoryFeed/CategoryFeed";
import monad_data from "../../assets/monad_data";
import defaultimage from "../../assets/all.jpg";
import bronze from "../../assets/bronze1.png";
import silver from "../../assets/silver1.png";
import gold from "../../assets/gold1.png";
import salute from "../../assets/salute1.png";
import "./Moyaki.css";
import { useLocation } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

const statusMapping = {
  All: defaultimage,
  Bronze: bronze,
  Silver: silver,
  Gold: gold,
  Honorary: salute,
};

const allStatus = ["All", "Bronze", "Silver", "Gold", "Honorary"];
const allCompetitions = [
  ...new Set(monad_data.map((item) => item.competition)),
]; // Get unique competitions

const Moyaki = () => {
  const location = useLocation(); // Get the location object
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(monad_data);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCompetion, setSelectedCompetion] = useState("All"); // New state for selected competition
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const competitionParam = params.get("competition");

    // Set selected competition based on the URL parameter
    if (competitionParam) {
      setSelectedCompetion(competitionParam);
    }
  }, [location.search]);

  useEffect(() => {
    setLoading(true); // Start loading
  
    const timeoutId = setTimeout(() => {
      const results = monad_data.filter((item) => {
        const matchesQuery =
          item.name && item.name.toLowerCase().includes(query.toLowerCase());
        const matchesStatus =
          selectedStatus === "All" || item.status === statusMapping[selectedStatus];
        
        // Compare competition directly
        const matchesCompetion =
          selectedCompetion === "All" ||
          (item.competition &&
            item.competition.toLowerCase() === selectedCompetion.toLowerCase());
  
        return matchesQuery && matchesStatus && matchesCompetion;
      });
  
      const sortedResults = results.sort((a, b) => {
        if (a.competition && !b.competition) return -1;
        if (!a.competition && b.competition) return 1;
        return 0;
      });
  
      setFilteredData(sortedResults);
      setLoading(false); // Stop loading
    }, 1000); // Simulate 1 second loading time
  
    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [query, selectedStatus, selectedCompetion]);
  
  const filterByCategory = (category) => {
    setSelectedStatus(category);
  };

  const handleCompetionChange = (event) => {
    setSelectedCompetion(event.target.value); // Update selected competition
  };

  return (
    <div>
      <MonadHero />
      <div className="flex">
        <Search query={query} setQuery={setQuery} />
        <div className="category-filter">
          {allStatus.map((statusItem) => (
            <button
              key={statusItem}
              className={`category-button ${
                selectedStatus === statusItem ? "active" : ""
              }`}
              onClick={() => filterByCategory(statusItem)}
            >
              <img src={statusMapping[statusItem]} alt={statusItem} />
              {statusItem}
            </button>
          ))}

          {/* Dropdown for Competition Filtering */}
          <select
            value={selectedCompetion}
            onChange={handleCompetionChange}
            className="select"
          >
            <option value="All">All Competitions</option>
            {allCompetitions.map((competition) => {
              const competitionDescription = competition.split("-")[1]?.trim(); // Get the part after the hyphen
              return (
                <option key={competition} value={competition}>
                  {competitionDescription || "Unknown Competition"}{" "}
                  {/* Show description or fallback */}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        {loading ? <Loading /> : <CategoryFeed filteredData={filteredData} />}
      </div>
    </div>
  );
};

export default Moyaki;
