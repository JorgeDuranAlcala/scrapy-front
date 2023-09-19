import { restRequestAuth } from "src/services/rest-requests";

const getProvinces = async () => {
  const response = await restRequestAuth('GET', '/provinces')

  return response.data.map(({id, name}: {id: number, name: string}) => ({
    id,
    name: name.split("/").map(word => word[0].toUpperCase() + word.slice(1)).join("/")
  }))
}

export default getProvinces
