import React, { useEffect, useState } from "react";
import "../styles/Results.css";
import noImage from "../assets/No-Image-Placeholder.svg.png";

function Results({ resultsData, isInitialised, activeTab }) {
  const commonURL = `https://image.tmdb.org/t/p/w300`;

  function showImage(media) {
    const imagePath = () => {
      if (media.poster_path) {
        return `${commonURL}${media.poster_path}`;
      }
      if (media.profile_path) {
        return `${commonURL}${media.profile_path}`;
      }
      return noImage;
    };
    return <img className="poster" src={imagePath()}></img>;
  }
  function isOriginalEqual(originalTitle, title) {
    if (originalTitle !== title) {
      return <div className="oriTitle">{originalTitle}</div>;
    } else {
      return <></>;
    }
  }

  return (
    <div>
      <div className="found">
        {isInitialised > 0 && <>Found: </>}
        {resultsData.total_results}
      </div>
      {resultsData && resultsData.results ? ( //checks if there are any results
        <div className="resultsContainer">
          {resultsData.results.map((media) => (
            <div key={media.id} className="resultCard">
              {showImage(media)}
              <div className="info">
                <div className="mediaType">{media.media_type}</div>
                <div className="title">
                  {activeTab === `Movies` ? media.title : media.name}
                </div>
                {activeTab === `Movies`
                  ? isOriginalEqual(media.original_title, media.title)
                  : isOriginalEqual(media.original_name, media.name)}
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
