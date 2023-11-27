import request from 'superagent'

const rootUrl = '/api/v1'

export async function postFormData(data) {
  return request.post(rootUrl + '/bought').send(data)
}
