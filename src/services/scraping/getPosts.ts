import { restRequestAuth } from "src/services/rest-requests";
import { SpecialFiltersData } from "src/components/Shared";

const getPosts = async (filters: SpecialFiltersData, website: any, page: number, perPage = 25) => {
  if(typeof website !== 'string') return { posts: [], total: 0 }

  const { municipality, ...rest } = filters
  const nonEmpty = Object.fromEntries(Object.entries(rest).filter(([, value]) => value !== ''))

  const response = await restRequestAuth('GET', '/posts', {
    params: {
      source: website,
      municipality: municipality?.name,
      ...nonEmpty,
      page: page + 1,
      per_page: perPage,
    }
  })

  const posts = response.data.map(({price_per_meter, state_id, source, owner, date,...rest}: any, i: number) => ({
    id: i,
    adOwner: owner,
    // TODO: Have backend send date in the format 'YY-MM-DD'
    // adDate: date,
    status: !state_id || state_id == 1 ? '' : state_id,
    published_in: source,
    sqrMtrPrice: price_per_meter,
    ...rest,
  }))

  return { posts: posts, total: response.total }
}

export default getPosts
