import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('medicine_weights', (t) => {
    t.increments('id');
    t.string('weight').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('medicine_weights');
}
