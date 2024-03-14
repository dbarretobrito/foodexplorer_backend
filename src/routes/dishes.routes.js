const { Router } = require('express');

// Importando e instanciando o controller
const DishesController = require('../controllers/DishesController');

// Inicializando
const dishesRoutes = Router();

const dishesController = new DishesController();

// Rotas
// Não é preciso usar mais o '/users' só a '/' já funciona
// Não é preciso passar (request, response). Só o método que tem dentro do controller
dishesRoutes.get('/', dishesController.index);

dishesRoutes.post('/', dishesController.create);
dishesRoutes.get('/:id', dishesController.show);
dishesRoutes.delete('/:id', dishesController.delete);

module.exports = dishesRoutes;
