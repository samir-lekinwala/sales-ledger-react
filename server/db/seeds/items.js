export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {
      item: 'PS5',
      price: 400,
      shipping: 15,
      platform: 'trademe',
      soldOrBought: 'bought',
    },
    {
      item: 'RTX 3080',
      price: 620,
      shipping: 0,
      platform: 'trademe',
      soldOrBought: 'bought',
    },
    {
      item: 'BBQ',
      price: 200,
      shipping: 0,
      platform: 'facebook',
      soldOrBought: 'sold',
    },
    {
      item: 'RTX 3080',
      price: 750,
      shipping: 0,
      platform: 'trademe',
      soldOrBought: 'sold',
    },
    {
      item: 'S22',
      price: 400,
      shipping: 10,
      platform: 'trademe',
      soldOrBought: 'bought',
    },
  ])
}
