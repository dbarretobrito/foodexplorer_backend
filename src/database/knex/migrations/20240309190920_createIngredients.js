exports.up = knex =>
  knex.schema.createTable('ingredients', table => {
    table.increments('id'); // ID do ingredient
    table.text('title').notNullable(); // Título do ingredient

    table
      .integer('dish_id')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE'); // Faz a ligação com os pratos. Um ingrediente pode estar em mais de um prato;
  });

exports.down = knex => knex.schema.dropTable('ingredients');
