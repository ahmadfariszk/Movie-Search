import React from "react";

function PagesBar({ resultsData, handlePageChange }) {
  let pageList = [];
  for (let i = 1; i <= resultsData.total_pages; i++) {
    pageList.push(i);
  }
  return (
    <>
      <div>
        showing {resultsData.results.length} results of{" "}
        {resultsData.total_results}
      </div>
      <div>
        Page: <select onChange={handlePageChange}>
          {pageList.map((number) => (
            <option key={number}>{number}</option>
          ))}
        </select> of {resultsData.total_pages}
      </div>
    </>
  );
}

export default PagesBar;
