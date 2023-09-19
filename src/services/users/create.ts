import { restRequestAuth } from 'src/services'
import { type UserFormData } from 'src/components/Forms'

const create = async (data: UserFormData) => {
  const response = await restRequestAuth('POST', '/users/create', {
    body: data
  })

  return response
}

export default create
