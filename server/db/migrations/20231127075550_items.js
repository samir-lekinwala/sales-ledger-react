export async function up(knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary()
    table.string('item')
    table.integer('price')
    table.integer('user_id')
    table.string('platform')
    table.string('soldOrBought')
    table.integer('potentialSalePrice')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('items')
}
