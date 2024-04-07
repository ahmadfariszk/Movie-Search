import React, { useEffect, useState } from "react";
import "../styles/Results.css";

function Results({ movieResults, isInitialised, activeTab }) {
  const commonURL = `https://image.tmdb.org/t/p/w300`;

  function showImage(media) {
    const imagePath = () => {
      if (media.poster_path) {
        return `${commonURL}${media.poster_path}`;
      }
      if (media.profile_path) {
        return `${commonURL}${media.profile_path}`;
      }
      return `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
    };
    return <img className="poster" src={imagePath()}></img>;
  } //TODO: seperate the no image available for person and movies/tv

  return (
    <div>
      <div className="found">
        {isInitialised > 0 && <>Found: </>}
        {movieResults.total_results}
      </div>
      {movieResults && movieResults.results ? ( //checks if there are any results
        <div className="resultsContainer">
          {movieResults.results.map((media) => (
            <div key={media.id} className="resultCard">
              {showImage(media)}
              <div className="info">
                <div className="mediaType">{media.media_type}</div>
                <div className="title">
                  {activeTab === `Movies` ? media.title : media.name}
                </div>
                <div className="oriTitle">
                  {activeTab === `Movies`
                    ? media.original_title
                    : media.original_name}
                </div>
                <div>{media.id}</div>
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
