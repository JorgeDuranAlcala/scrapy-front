import { restRequest } from "src/services/rest-requests";
import { SpecialFiltersData } from "src/components/Shared";

const getPosts = async (filters: SpecialFiltersData, page: number, perPage = 25) => {
  // const { province, municipality, ...extra } = filters
  // const response = await restRequest('GET', '/posts', {
  //   params: {filters: {
  //     municipality: municipality?.name,
  //     ...extra
  //   },
  //     page: page + 1, per_page: perPage}
  // })

  return []
}

export default getPosts
