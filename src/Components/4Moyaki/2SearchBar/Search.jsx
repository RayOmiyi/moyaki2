/* eslint-disable react/prop-types */
import "./Search.css";

const Search = ({ query, setQuery }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update query state in the parent component
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="@moyaki"
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default Search;
