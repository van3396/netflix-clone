import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css_for__components/Row.css";

function Row({ title, fetchUrl, isLargeRow }) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]); //this is a empty movies array

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

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
