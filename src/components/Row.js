import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css_for__components/Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]); //this is a empty movies array
  const [trailerUrl, setTrailerUrl] = useState("");
  // a snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // if [] run once when the row loads, and don't run again
    // if [movies], it runs everytime movies changes
    async function fetchData() {
      const req = await axios.get(fetchUrl);
      setMovies(req.data.results);
      return req;
    }
    fetchData();
    //we HAVE to put fitchUrl inside the second arugment array because if we use any varibale outside of our useEffect, it is dependent on that variable
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}
//test
export default Row;
