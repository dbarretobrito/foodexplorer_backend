const knex = require('../database/knex');

class DishesController {
  async create(request, response) {
    // Parâmetros enviados pelo body
    const { title, description, category, image, price, ingredients } =
      request.body;

    // Inserindo o prato e todos os seus dados na tabela dishes
    const insertedDish = await knex('dishes').insert({
      title,
      description,
      category,
      image,
      price,
    });

    // Obtendo o ID do prato inserido
    const dish_id = insertedDish[0];

    // Inserindo os ingredients passado no dish na tabela de ingredients
    const ingredientsInsert = ingredients.map(ingredient => ({
      title: ingredient,
      dish_id,
    }));

    // Insert the ingredients into the "ingredients" table
    await knex('ingredients').insert(ingredientsInsert);

    // Return a success response
    return response.status(201).json();
  }

  async show(request, response) {
    // pegando o id do prato que é passado como parâmetro
    const { id } = request.params;

    // Fazendo a busca na tabela dishes e pedindo para buscar somente o dado que tenha o ID que foi passado como parâmetro.
    const dish = await knex('dishes').where({ id }).first();

    // Fazendo a busca dos ingredientes também. Passando a dish_id que é o parâmetro passado pela request e ordenado por ordem alfabética
    const ingredients = await knex('ingredients')
      .where({ dish_id: id })
      .orderBy('title');

    // Fazendo o retorno
    return response.status(200).json({
      ...dish,
      ingredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('dishes').where({ id }).delete();

    return response.status(204).json();
  }
}

module.exports = DishesController;
