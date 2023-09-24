import { restRequestAuth } from "src/services/rest-requests";
import { SpecialFiltersData } from "src/components/Shared";

const getPosts = async (filters: SpecialFiltersData, page: number, perPage = 25) => {
  const { municipality, ...rest } = filters
  const nonEmpty = Object.fromEntries(Object.entries(rest).filter(([, value]) => value !== ''))
  // TODO send is_vip filter when endpoint accepts it
  const {is_vip, ...withoutVIP} = nonEmpty

  const response = await restRequestAuth('GET', '/posts', {
    params: {
      municipality: municipality?.name,
      ...withoutVIP,
      page: page + 1,
      per_page: perPage,
    }
  })

  const posts = response.data.map(({price_per_meter, ...rest}: any, i: number) => ({
    id: i,
    sqrMtrPrice: price_per_meter,
    ...rest,
  }))

  return { posts: posts, total: response.total }
}

export default getPosts
