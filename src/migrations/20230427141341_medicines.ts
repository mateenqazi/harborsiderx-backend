import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('medicines', (t) => {
    t.increments('id');
    t.string('image_name').nullable();
    t.string('name').notNullable();
    t.string('description').notNullable();
    t.string('price').notNullable();
    t.integer('doctors_fee').nullable();
    t.integer('pharmacy_fee').nullable();
    t.integer('shipping_cost').nullable();
    t.boolean('fda_approved_medication').nullable();
    t.string('average_treatment_cost').nullable();
    t.string('average_time_required').nullable();
    t.integer('mg_id').unsigned();
    t
      .foreign('mg_id')
      .references('id')
      .inTable('medicine_weights')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('qty_id').unsigned();
    t
      .foreign('qty_id')
      .references('id')
      .inTable('quantities')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('medicines');
}
