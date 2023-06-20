/* eslint-disable newline-per-chained-call */
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('answers', (t) => {
    t.increments('id');
    t.string('answer').nullable();
    t.integer('option_id').unsigned().nullable();
    t.foreign('option_id')
      .references('id')
      .inTable('options')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('user_id').unsigned().nullable();
    t.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    t.integer('question_id').unsigned();
    t.foreign('question_id')
      .references('id')
      .inTable('questions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.timestamps(true, true);
    // t.unique(['user_id', 'question_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('answers');
}
