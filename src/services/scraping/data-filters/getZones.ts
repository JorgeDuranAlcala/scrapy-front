import { restRequestAuth } from "src/services/rest-requests";

type Zone = {
  province_id: number
  id: number
  name: string
}

const getZones = async (municipality: string): Promise<Zone[]> => {
  const response = await restRequestAuth('GET', `/zonesof/${municipality}` )
  return response.data
}

export default getZones
