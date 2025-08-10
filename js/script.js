// Vou simular a persistência dos dados usando LocalStorage.
function loadMovies() {
  const storedMovies = localStorage.getItem('movies');
  if (storedMovies) {
    return JSON.parse(storedMovies);
  }

  // Caso não hajam dados no LocalStorage, irei carregar estes dados mocados.
  return [
    {
      id: '1',
      titulo: 'O Poderoso Chefão',
      genero: 'Drama, Crime',
      descricao: 'Um épico sobre a família mafiosa Corleone.',
      imagem:
        'https://via.placeholder.com/150/FF5733/FFFFFF?text=Poderoso+Chefao',
      gostei: 0,
      naoGostei: 0,
    },
    {
      id: '2',
      titulo: 'Interestelar',
      genero: 'Ficção Científica',
      descricao:
        'Uma equipe de exploradores viaja através de um buraco de minhoca.',
      imagem: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Interestelar',
      gostei: 0,
      naoGostei: 0,
    },
    {
      id: '3',
      titulo: 'A Origem',
      genero: 'Ficção Científica, Ação',
      descricao:
        'Um ladrão que rouba segredos corporativos através do uso de tecnologia de sonho.',
      imagem: 'https://via.placeholder.com/150/5733FF/FFFFFF?text=A+Origem',
      gostei: 0,
      naoGostei: 0,
    },
    {
      id: '4',
      titulo: 'Matrix',
      genero: 'Ficção Científica, Ação',
      descricao:
        'Um programador de computador descobre que a realidade é uma simulação.',
      imagem:
        'https://revistacontinente.com.br/image/view/news/image/2117/mobile',
      gostei: 0,
      naoGostei: 0,
    },
    {
      id: '5',
      titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
      genero: 'Fantasia, Aventura',
      descricao:
        'Um hobbit herda um anel poderoso e embarca em uma jornada épica.',
      imagem: 'https://via.placeholder.com/150/33FFFF/000000?text=Senhor+Aneis',
      gostei: 0,
      naoGostei: 0,
    },
  ];
}

// Criando a função para salvar os dados no LocalStorage.
function saveMovies(movies) {
  localStorage.setItem('movies', JSON.stringify(movies));
}

// Carregando os dados na variável.
let movies = loadMovies();

const moviesContainer = document.getElementById('movies-container');
const addMoviesForm = document.getElementById('add-movie-form');
const globalPositiveVotesSpan = document.getElementById(
  'global-positive-votes'
);
const globalNegativeVotesSpan = document.getElementById(
  'global-negative-votes'
);

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
    <span clarr="negative-count">${movie.naoGostei}</span>
  `;

  // Adicionando event listeners para os botões de voto.
  movieCard
    .querySelector('.like-button')
    .addEventListener('click', () => handleVote(movie.id, 'like'));
  movieCard
    .querySelector('.dislike-button')
    .addEventListener('click', () => handleVote(movie.id, 'dislike'));

  return movieCard;
}

function renderAllMovies() {
  moviesContainer.innerHTML = '';
  movies.forEach((movie) => {
    moviesContainer.appendChild(renderMovie(movie));
  });

  updateGlobalVotes();
}

function handleVote(id, type) {
  const movieIndex = movies.findIndex((m) => m.id === id);
  if (movieIndex > -1) {
    if (type === 'like') {
      movies[movieIndex].gostei++;
    } else if (type === 'dislike') {
      movies[movieIndex].naoGostei++;
    }

    saveMovies(movies); // Salvando os dados atualizados.
    updateMovieCard(id); // Atualizando apenas o card do filme.
    updateGlobalVotes();
  }
}

function updateMovieCard(id) {
  const movie = movies.find((m) => m.id === id);

  if (movie) {
    const movieCard = document.querySelector(`.movie-card[data-id"${id}"]`);
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

  const newMovie = {
    id: String(Date.now()), // Gerando um ID único baseado no timestamp. Preciso pesquisar se há outra forma melhor.
    titulo: document.getElementById('title').value,
    genero: document.getElementById('genre').value,
    imagem: document.getElementById('image').value,
    descricao: document.getElementById('description').value,
    gostei: 0,
    naoGostei: 0,
  };

  movies.push(newMovie);
  saveMovies(movies);
  moviesContainer.appendChild(renderMovie(newMovie)); // Adicionando o novo filme à lista com o appendChild.
  updateGlobalVotes();
  addMoviesForm.reset(); // Para limpar o formulário.
  alert('Filme/Série cadastrada com sucesso!');
});

document.addEventListener('DOMContentLoaded', renderAllMovies);
