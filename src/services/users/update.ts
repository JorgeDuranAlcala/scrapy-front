import { restRequestAuth } from 'src/services'
import { type UserFormData } from 'src/components/Forms'

const update = async ({id, ...body}: UserFormData) => {
  const response = await restRequestAuth('PUT', '/users/update', {
    body: { user_id: id, ...body}
  })

  return response
}

export default update
