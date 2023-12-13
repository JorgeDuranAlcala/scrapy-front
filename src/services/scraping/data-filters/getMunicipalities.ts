import { restRequestAuth } from 'src/services/rest-requests'

type Municipality = {
  province_id: number
  id: number
  name: string
}

const getMunicipalities = async (search: string): Promise<Municipality[]> => {
  const term = search && search.length > 0 ? search : undefined
  const response = await restRequestAuth('GET', `/municipalities?term=`, {
    params: { term }
  })
  return response.data
}

export default getMunicipalities
