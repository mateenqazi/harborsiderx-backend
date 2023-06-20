import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (t) => {
    t.increments('id');
    t.string('first_name').nullable();
    t.string('last_name').nullable();
    t.string('dob').nullable();
    t.string('email').notNullable();
    t.string('password').nullable();
    t.enum('type', ['local', 'google']).notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
