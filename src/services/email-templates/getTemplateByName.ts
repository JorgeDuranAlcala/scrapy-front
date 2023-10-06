import { restRequestAuth } from '../rest-requests'

const getTemplateByName = async (name: string) => {
  const response = await restRequestAuth('GET', `/templates/${name}`)
  return response
}

export default getTemplateByName
