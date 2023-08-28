import { restRequestAuth } from "src/services/rest-requests";
import { SpecialFiltersData } from "src/components/Shared";

type data = {
  filters: SpecialFiltersData
  page: string
}

const scrape = async ({filters, page}: data) => {
  const { province, municipality, ...extra } = filters
  const response = await restRequestAuth('GET', '/scrap', {
    params: {
      municipality: municipality?.name,
      ...extra,
      page}
  })

  return response
}

export default scrape
