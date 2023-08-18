import { restRequest } from 'src/services'
import { type UserFormData } from 'src/components/Forms'

const update = async (data: UserFormData) => {
  const response = await restRequest('PUT', '/users/create', {
    body: data
  })

  return response
}

export default update
