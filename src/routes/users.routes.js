// Importando
const { Router } = require('express');

// Importando e Instanciando o controller
const UsersController = require('../controllers/UsersController');
const usersController = new UsersController();

// Importando Middleware de autenticação
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

// Inicializando
const usersRoutes = Router();

// Rotas
// Não é preciso usar mais o '/users' só a '/' já funciona
// Não é preciso passar (request, response) só o método que tem dentro da controller
usersRoutes.post('/', usersController.create);
usersRoutes.put('/:id', usersController.update);

// Exportando
module.exports = usersRoutes;
