// Importando
const { Router } = require('express');

// Importando e Instanciando o controller
const DishesAdminController = require('../controllers/DishesAdminController');

// Inicializando
const dishesAdminRoutes = Router();

const dishesAdminController = new DishesAdminController();

// ROTAS
dishesAdminRoutes.post('/', dishesAdminController.create);
dishesAdminRoutes.delete('/:id', dishesAdminController.delete);
dishesAdminRoutes.put('/:id', dishesAdminController.update);

module.exports = dishesAdminRoutes;
