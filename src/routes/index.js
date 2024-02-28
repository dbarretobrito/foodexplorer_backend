// Importando da biblioteca
const { Router } = require('express');

// Importando as Rotas
const usersRoutes = require('./users.routes');

// Inicializando
const routes = Router();

// Centralizando todas as rotas da aplicação

// Quando o usuário chamar pela rota /users, ele será redirecionado para o users.routes.js
routes.use('/users', usersRoutes);

// Exportando
module.exports = routes;
