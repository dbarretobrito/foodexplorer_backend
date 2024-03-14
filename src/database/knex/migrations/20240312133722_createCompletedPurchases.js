exports.up = knex =>
  knex.schema.createTable('completedPurchase', table => {
    table.increments('id'); // ID da compra finalizada
    table.integer('user_id').references('id').inTable('users'); // ID do usuário que fez a compra

    table.text('orderStatus'); //Status do pedido
    table.text('orderPaymentMethod'); // Tipo de pagamento selecionado: Crédito ou PIX

    table.timestamp('created_at').default(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable('completedPurchase');
