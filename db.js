const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "my-cost-db.sqlite"
    },
    useNullAsDefault: true,
  });

knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name');
    table.string('password');
    table.timestamps();
})

knex.schema.createTable('movement_type', (table) => {
    table.increments();
    table.string('type_name');
})

knex.schema.createTable('cost_categories', (table) => {
    table.increments();
    table.string('category_name');

    table.foreign('movement_type_id').references('id').inTable('movement_type');
});

knex.schema.createTable('costs_tags', (table) => {
    table.increments();
    table.string('tag_name');

    table.foreign('category_id').references('id').inTable('cost_categories');
});

knex.schema.createTable('transactions', (table) => {
    table.increments();
    table.integer('sum');
    table.timestamps();

    table.foreign('uid').references('id').inTable('users');
    table.foreign('tag').references('id').inTable('costs_tags');
});