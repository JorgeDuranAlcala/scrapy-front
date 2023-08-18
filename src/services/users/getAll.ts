import { restRequest } from 'src/services'
import { type UserFormData } from 'src/components/Forms'

const getAll = async (page: number, search: string): Promise<UserFormData[]> => {
  const response = await restRequest('GET', '/users/', {
    // params: {search, page}
  })

  return response
}

export default getAll
