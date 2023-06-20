import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('shipping_billing_info', (t) => {
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
    t.string('first_name').notNullable();
    t.string('last_name').notNullable();
    t.string('DOB').notNullable();
    t.string('phone_no').notNullable();
    t.string('address').notNullable();
    t.string('state').notNullable();
    t.string('city').notNullable();
    t.integer('zip_code');
    t.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('shipping_billing_info');
}
