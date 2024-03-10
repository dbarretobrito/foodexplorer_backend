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

  async show(request, response) {
    // Pegando o id do prato que é passado como parâmetro
    const { id } = request.params;

    // Fazendo a busca na tabela dishes e pedindo para buscar somente o dado que tenha o ID que foi passado como parâmetro.
    const dish = await knex('dishes').where({ id }).first();

    // Fazendo a busca dos ingredients também. Passando dish_id que é o parâmetro passado pela request e ordenado por ordem alfabética
    const ingredients = await knex('ingredients')
      .where({ dish_id: id })
      .orderBy('title');

    // Fazendo o retorno
    return response.status(200).json({
      ...dish,
      ingredients,
    });
  }
}

module.exports = DishesController;
