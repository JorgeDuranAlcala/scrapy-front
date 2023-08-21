import { restRequest } from "src/services/rest-requests";

type Municipality = {
  province_id: number
  id: number
  name: string
}

const getMunicipalities = async (id?: number): Promise<Municipality[]> => {
  if (!id) return []
  const response = await restRequest('GET', '/municipalities')
  return response.data
}

export default getMunicipalities
