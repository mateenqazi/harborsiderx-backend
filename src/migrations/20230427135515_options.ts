import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('options', (t) => {
    t.increments('id');
    t.string('description', 500).notNullable();
    t.integer('question_id').unsigned();
    t.foreign('question_id')
      .references('id')
      .inTable('questions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('options');
}
