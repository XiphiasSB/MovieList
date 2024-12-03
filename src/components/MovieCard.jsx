import "./MovieCard.css"; // Optional for styling the cards
import React, { useState, useEffect } from "react";
// comment to test if git works


function MovieCard({ title, rating, url, director, year }) {
    const [poster, setPoster] = useState(null);

    useEffect(() => {
        async function fetchPoster() {
            try {
                const response = await fetch(
                    `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=6a2eced7`
                );
                const data = await response.json();
                if (data.Poster && data.Poster !== "N/A") {
                    setPoster(data.Poster); // Set the poster if available
                } else {
                    setPoster(null); // Handle cases where no poster is found
                }
            } catch (error) {
                console.error("Error fetching poster:", error);
                setPoster(null);
            }
        }

        fetchPoster();
    }, [title, year]);

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="movie-card">
            <h2 className="movie-title">{title} ({year})</h2>
            {poster ? (
                <img src={poster} alt={`${title} poster`} className="movie-poster" />
            ) : (
                <p className="movie-no-poster">No Poster Available</p>
            )}
            <p className="movie-rating">Rating: {rating} / 10</p>
            <p className="movie-director">Directed by: {director}</p>
        </a>
    );
}

export default MovieCard;
