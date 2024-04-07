import React from "react";

function PagesBar({ movieResults, handlePageChange }) {
  let pageList = [];
  for (let i = 1; i <= movieResults.total_pages; i++) {
    pageList.push(i);
  }
  return (
    <>
      <div>
        showing {movieResults.results.length} results of{" "}
        {movieResults.total_results}
      </div>
      <div>
        Page: <select onChange={handlePageChange}>
          {pageList.map((number) => (
            <option key={number}>{number}</option>
          ))}
        </select> of {movieResults.total_pages}
      </div>
    </>
  );
}

export default PagesBar;
