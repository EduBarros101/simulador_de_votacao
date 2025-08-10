const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = 'db.json';

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

async function readDb() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(
      'Erro ao ler o arquivo db.json. Iniciando com estrutura vazia:',
      error.message
    );
    return { movies: [] };
  }
}

async function writeDb(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Rotas da API
app.get('/api/movies', async (req, res) => {
  const db = await readDb();
  res.json(db.movies);
});

app.post('api/movies', async (req, res) => {
  const db = await readDb();
  const newMovie = {
    id: String(Date.now()),
    gostei: 0,
    naoGostei: 0,
    ...req.body,
  };

  db.movies.push(newMovie);
  await writeDb(db);
  res.status(201).json(newMovie);
});

// Rota para o registro de votos
app.post('/api/movies/:id/vote', async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  const db = await readDb();
  const movieIndex = db.movies.findIndex((m) => m.id === id);

  if (movieIndex > -1) {
    if (type === 'like') {
      db.movies[movieIndex].gostei++;
    } else if (type === 'dislike') {
      db.movies[movieIndex].naoGostei++;
    } else {
      return res.status(400).json({ message: 'Tipo de voto inválido.' });
    }

    await writeDb(db);
    res.json(db.movies[movieIndex]); // Retornando o filme atualizado
  } else {
    res.status(404).json({ message: 'Filme não encontrado' });
  }
});

// Rota para obter os totais globais de votos
app.get('/api/global-votes', async (req, res) => {
  const db = await readDb();
  let totalPositive = 0;
  let totalNegative = 0;

  db.movies.forEach((movie) => {
    totalPositive += movie.gostei;
    totalNegative += movie.naoGostei;
  });

  res.json({ totalPositive, totalNegative });
});

// Iniciando meu servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Acesse o front-end em http://localhost:${PORT}/index.html`);
});
