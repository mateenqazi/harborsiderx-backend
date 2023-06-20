import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('payments', (t) => {
    t.increments('id');
    t.integer('user_id').unsigned();
    t
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('membership_id').unsigned();
    t
      .foreign('membership_id')
      .references('id')
      .inTable('memberships')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.string('currency').notNullable().defaultTo('USD');
    t.integer('amount').notNullable();
    t.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('payments');
}
