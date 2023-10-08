import { restRequestAuth } from '../rest-requests'

const getTemplateByName = async (name: string) => {
  const response = await restRequestAuth('GET', `/template/${name.toLowerCase()}`)
  return response.data
}

export default getTemplateByName
