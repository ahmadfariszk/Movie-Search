import React from "react";

function SearchBox(props) {
  const { handleInputChange, handleSubmit,query } = props;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your search query"
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default SearchBox;
