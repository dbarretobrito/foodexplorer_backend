const knex = require('../database/knex');

class DishesController {
  async create(request, response) {
    // Parâmetros enviados pelo body
    const { title, description, category, image, price, ingredients } =
      request.body;

    // Inserindo o prato e todos os seus dados
    const dish_id = await knex('dishes').insert({
      title,
      description,
      category,
      price,
    });

    // Inserindo os ingredients passado no dish na tabela ingredients
    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        title: ingredient,
        dish_id,
      };
    });
    await knex('ingredients').insert(ingredientsInsert);

    return response.status(201).json();
  }
}

module.exports = DishesController;
