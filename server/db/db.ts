import db from './connection.ts'
// import { Fruit } from '../../models/fruit.ts'

export async function getAllItems() {
  return db('items').select()
}
export async function getItem(id: number) {
  return db('items').where('id', id).select()
}
export async function addItem(data) {
  return db('items')
    .insert(data)
    .returning(['id', 'item'])
    .then((item) => item[0])
}
export async function deleteItem(id: number) {
  return db('items').where('id', id).del()
}
export async function updateItem(id: number, data) {
  return db('items').where('id', id).update(data)
}
