// Importando da biblioteca
const { Router } = require('express');

// Importando as Rotas
const usersRoutes = require('./users.routes');
const dishesRoutes = require('./dishes.routes');

// Inicializando
const routes = Router();

// Centralizando todas as rotas da aplicação

// Quando o usuário chamar pela rota /users, ele será redirecionado para o users.routes.js
routes.use('/users', usersRoutes);
routes.use('/dishes', dishesRoutes);

// Exportando
module.exports = routes;
