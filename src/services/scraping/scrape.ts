import { restRequestAuth } from "src/services/rest-requests";
import { SpecialFiltersData } from "src/components/Shared";

type data = {
  filters: SpecialFiltersData
  page: string
}

const scrape = async ({filters, page}: data) => {
  const { city, ...extra } = filters
  const response = await restRequestAuth('GET', '/scrap', {
    params: {
      municipality: city?.name,
      ...extra,
      page}
  })

  return response
}

export default scrape
