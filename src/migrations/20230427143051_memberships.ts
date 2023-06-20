import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('memberships', (t) => {
    t.increments('id');
    t.integer('user_id').unsigned();
    t
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('medicine_id').unsigned();
    t
      .foreign('medicine_id')
      .references('id')
      .inTable('medicines')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.string('membership_start_date').defaultTo(new Date());
    t.string('membership_end_date');
    t.enum('status', ['pending', 'cleared', 'completed']).defaultTo('pending');
    t.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('memberships');
}
