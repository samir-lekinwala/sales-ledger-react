import db from './connection.ts'
// import { Fruit } from '../../models/fruit.ts'

export async function getAllItems() {
  return db('items').select()
}

export async function addItem(data) {
  console.log('db function for adding', data)
  return db('items').insert(data)
}
export async function deleteItem(id: number) {
  console.log('pretend to delete ', id)
  return db('items').where('id', id).del()
}
