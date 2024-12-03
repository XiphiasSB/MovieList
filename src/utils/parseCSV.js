import Papa from "papaparse";

// Define the path to the CSV file in the public folder
const CSV_PATH = "/MyMoviesDB.csv";

// Function to fetch and parse the CSV file
export async function getMovies() {
    const response = await fetch(CSV_PATH); // Fetch the CSV file
    if (!response.ok) {
        throw new Error(`Failed to fetch CSV file: ${response.statusText}`);
    }
    const csvText = await response.text(); // Get its text content

    return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const movies = results.data
                    .filter((row) => row["Title Type"] === "Movie") // Keep only movies
                    .map((row) => ({
                        title: row.Title || "Unknown Title",
                        rating: row["Your Rating"] || "N/A",
                        director: row.Directors || "Unknown Director",
                        url: row.URL || "#",
                        yr: row.Year || "Unknown Year",
                    }));
                resolve(movies);
            },
            error: function (error) {
                reject(error); // Handle errors if parsing fails
            },
        });
    });
}

