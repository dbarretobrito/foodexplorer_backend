const knex = require('../database/knex');

class DishesController {
  async create(request, response) {
    // ... existing code for getting other dish data (description, category, etc.)

    const { title, description, category, image, price, ingredients } =
      request.body;

    // Insert the new dish in the "dishes" table
    const insertedDish = await knex('dishes').insert({
      title,
      description,
      category,
      price,
    });

    // Get the ID of the inserted dish (assuming single row insertion)
    const dish_id = insertedDish[0];

    // Map ingredients to an array of objects for insertion
    const ingredientsInsert = ingredients.map(ingredient => ({
      title: ingredient,
      dish_id,
    }));

    // Insert the ingredients into the "ingredients" table
    await knex('ingredients').insert(ingredientsInsert);

    // Return a success response
    return response.status(201).json();
  }
}

module.exports = DishesController;
