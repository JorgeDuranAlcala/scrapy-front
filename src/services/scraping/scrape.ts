import { restRequestAuth } from "src/services/rest-requests";
import { SpecialFiltersData } from "src/components/Shared";

type data = {
  filters: SpecialFiltersData
  website: string
}

const scrape = async ({filters, website}: data) => {
  const { municipality, is_vip, ...rest } = filters

  const nonEmpty = Object.fromEntries(Object.entries(rest).filter(([, value]) => value !== ''))

  const response = await restRequestAuth('GET', '/scrap', {
    params: {
      municipality: municipality?.name,
      ...nonEmpty,
      page: website
    }
  })

  return response
}

export default scrape
