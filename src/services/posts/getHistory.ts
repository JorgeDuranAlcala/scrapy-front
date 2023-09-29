import { restRequestAuth } from "src/services/rest-requests";

type data = {
  email?: string
  perPage?: number
  page: number
}

const getHistory = async ({email, page, perPage = 30} : data) => {
  const response = await restRequestAuth('GET', '/history', {
    params: {
      email: email ? email : undefined ,
      page: page + 1,
      per_page: perPage,
    }
  })

  const history = response.data.map(({price_per_meter, date, ...rest}: any, i: number) => ({
    id: i,
    date: new Date(date),
    sqrMtrPrice: price_per_meter,
    ...rest,
  }))

  return { history: history, total: response.total }
}

export default getHistory
