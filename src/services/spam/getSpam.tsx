import { restRequestAuth } from '../rest-requests'

const getSpam = async (): Promise<string[]> => {
  const response = await restRequestAuth('GET', `/spam`)
  return response.data
}

export default getSpam
