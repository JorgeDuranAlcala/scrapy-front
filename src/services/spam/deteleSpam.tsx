import { restRequestAuth } from '../rest-requests'

const deleteSpam = async (email: string) => {
  const response = await restRequestAuth('GET', `/spam/${email}`)
  return response.data
}

export default deleteSpam
