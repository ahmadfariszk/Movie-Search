import React, { useEffect } from "react";

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
    return <img width="300" src={imagePath()}></img>;
  } //TODO: seperate the no image available for person and movies/tv

  return (
    <div>
      <div>
        {count > 0 && <>Found: </>}
        {movieResults.total_results}
      </div>
      {movieResults && movieResults.results ? (
        movieResults.results.map((multi) => (
          <div key={multi.id}>
            {multi.media_type == `movie` && (
              <>
                <div>
                  {multi.id}|{multi.title} | {multi.original_title} |{" "}
                  {multi.media_type}
                </div>
                {showImage(multi)}
              </>
            )}
            {multi.media_type == `tv` && (
              <>
                <div>
                  {multi.id}|{multi.name} | {multi.original_name} |{" "}
                  {multi.media_type}
                </div>
                {showImage(multi)}
              </>
            )}
            {multi.media_type == `person` && (
              <>
                <div>
                  {multi.id}|{multi.name} | {multi.original_name} |{" "}
                  {multi.media_type}
                </div>
                {showImage(multi)}
              </>
            )}
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default Results;
