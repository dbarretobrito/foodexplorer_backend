exports.up = knex =>
  knex.schema.createTable('cartItems', table => {
    table.increments('id'); // ID do pedido
    table
      .integer('cart_id')
      .references('id')
      .inTable('completedPurchase')
      .onDelete('CASCADE');
    table.integer('dish_id').references('id').inTable('dishes');

    table.text('title');
    table.integer('quantity');

    table.timestamp('created_at').default(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable('cartItems');
