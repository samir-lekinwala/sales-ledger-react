import db from './connection.ts'
// import { Fruit } from '../../models/fruit.ts'

export async function getAllItems() {
  return db('items').select()
}

export async function addItem(data) {
  return db('items').insert(data)
}
