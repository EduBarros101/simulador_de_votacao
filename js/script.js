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
      imagem: 'https://via.placeholder.com/150/FFFF33/000000?text=Matrix',
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
