// Importando
const { Router } = require('express');

// Inicializando
const usersRoutes = Router();

// Rotas
// Não é preciso usar mais o '/users' só a '/' já funciona
usersRoutes.post('/', (request, response) => {
  const { name, email, password } = request.body;

  response.json({ name, email, password });
});

// Exportando
module.exports = usersRoutes;
