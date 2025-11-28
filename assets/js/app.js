
async function getUpcomingMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Failed to fetch upcoming movies:', error);
    }
}

function displayMovies(movies) {
    const container = document.getElementById('upcoming-movie-container'); // Fixed spelling here
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieElem = document.createElement('div');
        movieElem.classList.add('movie');

        const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : 'https://via.placeholder.com/200x300?text=No+Image';

        movieElem.innerHTML = `
            <img src="${posterUrl}" alt="${movie.title} poster" />
            <div class="movie-title">${movie.title}</div>`;

        container.appendChild(movieElem);
    });
}

getUpcomingMovies();
