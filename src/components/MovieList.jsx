import React, { useEffect, useState } from "react";
import { getMovies } from "../utils/parseCSV";
import MovieCard from "./MovieCard";
import './MovieList.css';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]); // Movies after filtering
    const [sortBy, setSortBy] = useState("titleAZ"); // Default sorting by title A-Z
    const [searchQuery, setSearchQuery] = useState(""); // User's search input

    useEffect(() => {
        async function fetchMovies() {
            try {
                const data = await getMovies();
                const sortedData = data.sort((a, b) => a.title.localeCompare(b.title)); // Default sort by title A-Z
                setMovies(sortedData); // Ensure movies are initially sorted
                setFilteredMovies(sortedData); // Align filtered movies with initial movies
            } catch (error) {
                console.error("Error loading movies:", error);
            }
        }

        fetchMovies();
    }, []);

    const handleSort = (e) => {
        const sortKey = e.target.value;
        setSortBy(sortKey); // Update the sorting criteria

        const sortedMovies = [...filteredMovies].sort((a, b) => {
            if (sortKey === "titleAZ") {
                return a.title.localeCompare(b.title); // Sort alphabetically A-Z
            }
            if (sortKey === "titleZA") {
                return b.title.localeCompare(a.title); // Sort alphabetically Z-A
            }
            if (sortKey === "ratingA") {
                return a.rating - b.rating; // Sort by rating low-high
            }
            if (sortKey === "ratingD") {
                return b.rating - a.rating; // Sort by rating high-low
            }
            return 0;
        });

        setFilteredMovies(sortedMovies); // Update filteredMovies with the sorted order
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter movies based on title, rating, or director
        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(query) ||
            movie.rating.toString().includes(query) ||
            (movie.director && movie.director.toLowerCase().includes(query)) ||
            movie.yr.toString().includes(query)
        );
        console.log("Filtered Movies:", filteredMovies);
        setFilteredMovies(filtered);
    };

    return (
        <div className="movie-list">
            <h1 className="title">My IMDb Rated Movies</h1>
            <div className="sticky-container">
                {/* Sorting Dropdown */}
                <div className="sorting-controls">
                    <label htmlFor="sort">Sort by: </label>
                    <select id="sort" value={sortBy} onChange={handleSort}>
                        <option value="titleAZ">Title A-Z</option>
                        <option value="titleZA">Title Z-A</option>
                        <option value="ratingA">Rating Low-High</option>
                        <option value="ratingD">Rating High-Low</option>
                    </select>
                </div>

                <div className="search-bar">
                    <label htmlFor="search">Search: </label>
                    <input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by title, rating, or director"
                    />
                </div>
            </div>




            <div className="movie-grid">
                {filteredMovies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        title={movie.title}
                        rating={movie.rating}
                        url={movie.url}
                        director={movie.director}
                        year={movie.yr}
                    />
                ))}
            </div>
        </div>
    );
}

export default MovieList;
