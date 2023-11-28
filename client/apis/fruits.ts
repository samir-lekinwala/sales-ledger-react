import request from 'superagent'

const rootUrl = '/api/v1'

export async function postFormData(data) {
  return request.post(rootUrl + '/bought').send(data)
}
export async function getAllItems() {
  return request.get(rootUrl + '/bought')
}
