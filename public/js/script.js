const API_BASE_URL = 'http://localhost:3000/api';

let movies = [];

const moviesContainer = document.getElementById('movies-container');
const addMoviesForm = document.getElementById('add-movie-form');
const globalPositiveVotesSpan = document.getElementById(
  'global-positive-votes'
);
const globalNegativeVotesSpan = document.getElementById(
  'global-negative-votes'
);

// Interações com a API

async function fetchMovies() {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`);

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    movies = await response.json();
    renderAllMovies();
  } catch (error) {
    console.error('Erro ao buscar filmes: ', error);
  }
}

async function sendVote(id, type) {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const updateMovie = await response.json();
    const movieIndex = movies.findIndex((m) => m.id === id);

    if (movieIndex > -1) {
      movies[movieIndex] = updateMovie;
    }

    updateMovieCard(id);
    updateGlobalVotes();
  } catch (error) {
    console.log('Ocorreu um erro ao enviar seu voto: ', error);
  }
}

async function addMovieToApi(newMovieData) {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovieData),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const addedMovie = await response.json();

    movies.push(addedMovie);
    moviesContainer.appendChild(renderMovie(addedMovie));
    updateGlobalVotes();
    addMoviesForm.reset();

    alert('Filme/Série cadastrada com sucesso! :)');
  } catch (error) {
    console.log('Erro ao cadastrar filme: ', error);
    alert('Ocorreu um erro ao cadastrar seu Filme/Série.');
  }
}

async function fetchGlobalVotes() {
  try {
    const response = await fetch(`${API_BASE_URL}/global-votes`);

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const data = await response.json();

    globalPositiveVotesSpan.textContent = data.totalPositive;
    globalNegativeVotesSpan.textContent = data.totalNegative;
  } catch (error) {
    console.log('Erro ao buscar votos globais: ', error);
  }
}

// Renderizando
function renderMovie(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');
  movieCard.dataset.id = movie.id;

  movieCard.innerHTML = `
  <h3>${movie.titulo}</h3>
  <img src="${movie.imagem}" alt="${movie.titulo}">
  <p><strong>Gênero:</strong> ${movie.genero}</p>
  <p><strong>Descrição:</strong> ${movie.descricao || 'NA'}</p>
  <div class="votes">
    <button class="vote-button like-button" data-type="like">Gostei</button>
    <span class="positive-count">${movie.gostei}</span>
    <button class="vote-button dislike-button" data-type="dislike">Não Gostei</button>
    <span class="negative-count">${movie.naoGostei}</span>
  `;

  // Adicionando event listeners para os botões de voto.
  movieCard
    .querySelector('.like-button')
    .addEventListener('click', () => sendVote(movie.id, 'like'));
  movieCard
    .querySelector('.dislike-button')
    .addEventListener('click', () => sendVote(movie.id, 'dislike'));

  return movieCard;
}

function renderAllMovies() {
  moviesContainer.innerHTML = '';
  movies.forEach((movie) => {
    moviesContainer.appendChild(renderMovie(movie));
  });

  fetchGlobalVotes();
}

function updateMovieCard(id) {
  const movie = movies.find((m) => m.id === id);

  if (movie) {
    const movieCard = document.querySelector(`.movie-card[data-id="${id}"]`);
    if (movieCard) {
      movieCard.querySelector('.positive-count').textContent = movie.gostei;
      movieCard.querySelector('.negative-count').textContent = movie.naoGostei;
    }
  }
}

// Atualizando os totais globais de votos
function updateGlobalVotes() {
  let totalPositive = 0;
  let totalNegative = 0;

  movies.forEach((movie) => {
    totalPositive += movie.gostei;
    totalNegative += movie.naoGostei;
  });

  globalPositiveVotesSpan.textContent = totalPositive;
  globalNegativeVotesSpan.textContent = totalNegative;
}

// Tratando o envio do formulário de adição de filme.
addMoviesForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newMovieData = {
    titulo: document.getElementById('title').value,
    genero: document.getElementById('genre').value,
    imagem: document.getElementById('image').value,
    descricao: document.getElementById('description').value,
  };

  addMovieToApi(newMovieData); // Para interagir com a API

  // movies.push(newMovie);
  // saveMovies(movies);
  // moviesContainer.appendChild(renderMovie(newMovie)); // Adicionando o novo filme à lista com o appendChild.
  // updateGlobalVotes();
  // addMoviesForm.reset(); // Para limpar o formulário.
  // alert('Filme/Série cadastrada com sucesso!');
});

document.addEventListener('DOMContentLoaded', fetchMovies);
