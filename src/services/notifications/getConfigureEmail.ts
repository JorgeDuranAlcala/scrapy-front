import { restRequestAuth } from '../rest-requests'

const getConfigureEmail = async () => {
  const response: Promise<any> = await restRequestAuth('GET', '/notify/settings')
  console.log(response)
  return response
}

export default getConfigureEmail
