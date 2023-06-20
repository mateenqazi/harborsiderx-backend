import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('questions', (t) => {
    t.increments('id');
    t.string('description').notNullable();
    t.enum('type', ['radio', 'text']).defaultTo('radio');
    t.integer('step');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('questions');
}
