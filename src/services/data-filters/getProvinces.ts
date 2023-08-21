import { restRequest } from "src/services/rest-requests";

const getProvinces = async () => {
  const response = await restRequest('GET', '/provinces')

  return response.data.map((province: string, id: number) => ({
    id,
    name: province.split("/").map(name => name[0].toUpperCase() + name.slice(1)).join("/")
  }))
}

export default getProvinces
