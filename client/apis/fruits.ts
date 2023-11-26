import request from 'superagent'

const rootUrl = '/api/v1'

export async function postFormData(): Promise<string[]> {
  await request.post(rootUrl + '/bought')
}
