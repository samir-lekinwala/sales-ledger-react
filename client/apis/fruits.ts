import request from 'superagent'
import * as models from '../models/items.tsx'

const rootUrl = '/api/v1'

export async function postFormData(data: models.item) {
  return request.post(rootUrl + '/bought').send(data)
}
export async function getAllItems() {
  return request.get(rootUrl + '/bought')
}
export async function deleteItem(id: number) {
  return request.delete(rootUrl + `/delete/${id}`)
}
