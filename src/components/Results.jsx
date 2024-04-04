import React, { useEffect, useState } from "react";
import "../styles/Results.css";

function Results({ movieResults, count }) {
  const commonURL = `https://image.tmdb.org/t/p/w300`;

  function showImage(multi) {
    const imagePath = () => {
      console.log("image path");
      if (multi.poster_path) {
        return `${commonURL}${multi.poster_path}`;
      }
      if (multi.profile_path) {
        return `${commonURL}${multi.profile_path}`;
      }
      return `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
    };
    return <img className="poster" src={imagePath()}></img>;
  } //TODO: seperate the no image available for person and movies/tv

  return (
    <div>
      <div className="found">
        {count > 0 && <>Found: </>}
        {movieResults.total_results}
      </div>
      {movieResults && movieResults.results ? ( //checks if there are any results
        <div className="resultsContainer">
          {movieResults.results.map((multi) => (
            <div key={multi.id} className="resultCard">
              {showImage(multi)}
              <div className="info">
                <div className="mediaType">{multi.media_type}</div>
                <div className="title">
                  {multi.media_type === `movie` ? multi.title : multi.name}
                </div>
                <div className="oriTitle">
                  {multi.media_type === `movie`
                    ? multi.original_title
                    : multi.original_name}
                </div>
                <div>{multi.id}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default Results;
