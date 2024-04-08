import React, { useEffect, useState } from "react";
import "../styles/Results.css";
import noImage from "../assets/No-Image-Placeholder.svg.png";
import { Star } from "lucide-react";

function Results({
  resultsData,
  isInitialised,
  activeTab,
  movieGenres,
  seriesGenres,
}) {
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
  function getOriginalTitle(originalTitle, title) {
    //only returns original title if its different than the title/name
    if (originalTitle !== title) {
      return <div className="oriTitle">{originalTitle}</div>;
    } else {
      return <></>;
    }
  }
  function isVoted(voteCount, voteScore) {
    if (voteCount === 0) {
      return (
        <>
          <Star size={18} strokeWidth={2} color="#686868" />
          No votes
        </>
      );
    } else {
      return (
        <>
          <Star size={18} strokeWidth={2} fill="#f3b40c" color="#614705" />{" "}
          {voteScore}({voteCount})
        </>
      );
    }
  }
  function formatDate(dateString) {
    if (dateString !== "") {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "short" };
      return date.toLocaleDateString("en-US", options);
    } else {
      return <>Not known</>;
    }
  }
  function getGenres(genreIDs) {
    if(genreIDs.length==0){return <>{" None "}</>}
    if (activeTab === `Movies`) {
      return (
        <>
          {`${getGenreByType(movieGenres, genreIDs)}`}
        </>
      );
    } else if (activeTab===`Series`){return (
      <>
        {`${getGenreByType(seriesGenres, genreIDs)}`}
      </>
    );}
  }
  function getGenreByType(mediaGenre, genreIDs) {
    return genreIDs.map((genreID) => {
      let genreName = "";
      mediaGenre.genres.map((genreList) => {
        if (genreID === genreList.id) {
          genreName = genreList.name;
        }
      });
      return ` ${genreName}`;
    })
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
                <div className="title">
                  {activeTab === `Movies` ? media.title : media.name}
                </div>
                {activeTab === `Movies`
                  ? getOriginalTitle(media.original_title, media.title)
                  : getOriginalTitle(media.original_name, media.name)}

                <div>
                  {isVoted(media.vote_count, media.vote_average)}, Released:{" "}
                  {formatDate(media.release_date)}
                </div>
                <div className="overview">{media.overview}</div>
                <div>Genre: {getGenres(media.genre_ids)}</div>
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
