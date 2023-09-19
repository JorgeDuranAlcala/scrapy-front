import { restRequestAuth } from 'src/services'
import { type UserFormData } from 'src/components/Forms'

type Response = {
  users: UserFormData[],
  total: number
}

const getAll = async (page: number, limit: number,search: string): Promise<Response> => {
  const response = await restRequestAuth('GET', '/users/paginate', {
    params: {search, page, per_page: limit}
  })
  const [users, total] = response.data
  return {users, total}
}

export default getAll
