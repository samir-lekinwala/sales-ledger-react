export async function up(knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary()
    table.string('item')
    table.integer('price')
    table.integer('shipping').defaultTo('0')
    table.integer('feePercentage').defaultTo('0')
    table.integer('feeDollar').defaultTo('0')
    table.integer('user_id')
    table.string('platform')
    table.string('soldOrBought')
    table.integer('potentialSalePrice').defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('inventory').notNullable().defaultTo(0)
    table.integer('bought_Id').unique()
  })
}

export async function down(knex) {
  return knex.schema.dropTable('items')
}
