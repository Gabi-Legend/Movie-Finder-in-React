import React, { useState } from "react";
import styles from "./MovieFinder.module.css";

function MovieFinder() {
  const [movie, updateMovie] = useState("");
  const [result, updateResult] = useState(null);
  const [error, setError] = useState("");

  function searchMovie() {
    if (!movie.trim()) return;

    setError("");
    fetch(`https://www.omdbapi.com/?apikey=f0928afe&s=${movie}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          updateResult(data.Search);
        } else {
          updateResult(null);
          setError(data.Error || "Movie not found.");
        }
      })
      .catch(() => {
        updateResult(null);
        setError("Something went wrong.");
      });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬 Movie Finder</h1>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search a movie"
          value={movie}
          onChange={(e) => updateMovie(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovie()}
        />
        <button onClick={searchMovie}>Search</button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {result ? (
        <div className={styles.movieGrid}>
          {result.map((item) => (
            <div key={item.imdbID} className={styles.movieCard}>
              <img
                src={
                  item.Poster !== "N/A"
                    ? item.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={item.Title}
              />
              <h3>{item.Title}</h3>
              <p>{item.Year}</p>
            </div>
          ))}
        </div>
      ) : (
        !error && <p className={styles.placeholder}>Search for a movie!</p>
      )}
    </div>
  );
}

export default MovieFinder;
