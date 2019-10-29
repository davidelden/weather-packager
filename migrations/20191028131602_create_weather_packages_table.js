exports.up = function(knex) {
  return knex.schema
    .createTable('weather_packages', tbl => {
      tbl.increments('id').primary();
      tbl.string('zip_code').index().unique();
      tbl.jsonb('message');
      tbl.boolean('published').defaultTo(false);
      tbl.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('weather_packages');
};
