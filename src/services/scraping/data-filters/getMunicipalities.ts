import { restRequestAuth } from "src/services/rest-requests";

type Municipality = {
  province_id: number
  id: number
  name: string
}

const getMunicipalities = async (search?: string): Promise<Municipality[]> => {
  const response = await restRequestAuth('GET', `/municipalities/`, {
    params: {search}
  })
  return response.data
}

export default getMunicipalities
