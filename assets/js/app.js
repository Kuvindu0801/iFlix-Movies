const apiKey = '2ddc93d4834d63671d94572934ee483b';

let id = 550; // Example TV show ID

async function fetchShowDetails(id) {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById('show-title').textContent = `${data.name} (${data.first_air_date.slice(0, 4)})`;
    document.getElementById('tags').textContent = data.genres.map(g => g.name).join(', ');
    document.getElementById('show-overview').textContent = data.overview;
    document.getElementById('show-score').textContent = Math.round(data.vote_average * 10) + '%';
    document.getElementById('img-bg').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    document.getElementById('show-creators').textContent = data.created_by.map(c => c.name).join(', ');
}

fetchShowDetails(id);


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
