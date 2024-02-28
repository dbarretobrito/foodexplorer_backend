// Tratamento de exceções
require('express-async-errors');
const AppError = require('./utils/AppError');

// Importando bibliotecas
const express = require('express');

// Importando rotas (ele vai buscar o arquivo index.js)
const routes = require('./routes');

// Inicializando biblioteca
const app = express();

// Atribuindo o tipo de dado que será enviado pelo body e as rotas que serão utilizadas
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  // Sabendo se é um error gerado pelo client
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  // erro "padrão" do servidor
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`O servidor local com node está rodando na porta: ${PORT}`);
});
