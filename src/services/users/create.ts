import { restRequest } from 'src/services'
import { type UserFormData } from 'src/components/Forms'

const create = async (data: UserFormData) => {
  const response = await restRequest('POST', '/users/create', {
    body: data
  })

  return response
}

export default create
