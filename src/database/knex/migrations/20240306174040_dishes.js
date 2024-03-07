exports.up = knex => knex.schema.createTable('dishes', table => {});

exports.down = knex => knex.schema.dropTable('dishes');
