import { restRequestAuth } from 'src/services'
import { type UserFormData } from 'src/components/Forms'

const update = async ({id, password,...body}: UserFormData) => {
  //TODO: Wait for decision on password update by admin

  const response = await restRequestAuth('PUT', '/users/update', {
    body: { user_id: id, ...body}
  })

  return response
}

export default update
