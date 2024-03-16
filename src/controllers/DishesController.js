const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class DishesController {
  async create(request, response) {
    // Parâmetros enviados pelo body
    const { title, description, category, image, price, ingredients } =
      request.body;

    // Conferência se o prato já existe no banco de dados AQUI
    const checkDishAlreadyExistInDatabase = await knex('dishes')
      .where({ title })
      .first();

    if (checkDishAlreadyExistInDatabase) {
      throw new AppError('Este prato já existe em nossa database');
    }

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
      name: ingredient,
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
      .orderBy('name');

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

  async index(request, response) {
    // Fazendo a busca pelo nome do prato ou pelos ingredients existentes
    const { title, ingredients } = request.query;

    let dishes;

    // Fazendo a busca pelos ingredients
    if (ingredients) {
      // convertendo os ingredientes em um vetor de dados(Array) a partir de cada ","
      //.map(ingredient => ingredient.trim()); é para garantir que NÃO TEREMOS ESPAÇOS VAZIOS

      const filteredIngredients = ingredients
        .split(',')
        .map(ingredient => ingredient.trim());

      // A partir do ingrediente digitado, será atribuido os pratos que contenham ele na variável dishes
      // O método whereIn() vai buscar baseado nos ingredients filtrados
      // O método innerJoin() vai buscar os registros em comum que as tabelas passadas têm passando 3 coisas: nome da tabela, chave primária e chave estrangeira

      dishes = await knex('ingredients')
        .select([
          'dishes.id',
          'dishes.title',
          'dishes.category',
          'dishes.image',
          'dishes.price',
        ])
        .whereLike('dishes.title', `%${title}%`)
        .whereIn('name', filteredIngredients)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
        .orderBy('dishes.title');
    } else {
      // Fazendo a busca do prato pelo nome
      dishes = await knex('dishes').whereLike('title', `%${title}%`);
    }

    const dishesIngredients = await knex('ingredients');

    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredient = dishesIngredients.filter(
        ingredient => ingredient.dish_id === dish.id
      );

      return {
        ...dish,
        ingredients: dishIngredient,
      };
    });

    return response.status(200).json(dishesWithIngredients);
  }

  async update(request, response) {
    // Capturando as informações passadas peloo body e por params
    const { title, description, category, image, price, ingredients } =
      request.body;
    const { id } = request.params;

    // Adicionando na constante dish o primeiro dado encontrado par ao id passado como params
    const dish = await knex('dishes').where({ id }).first();

    // Verificação
    dish.title = title ?? dish.title;
    dish.description = description ?? dish.description;
    dish.category = category ?? dish.category;
    dish.image = image ?? dish.image;
    dish.price = price ?? dish.price;

    await knex('dishes').where({ id }).update(dish);
    await knex('dishes').where({ id }).update('updated_at', knex.fn.now());

    return response.json();
  }
}

module.exports = DishesController;