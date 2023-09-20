import { restRequestAuth } from 'src/services'
import { type UserFormData } from 'src/components/Forms'

type UserData = Required<UserFormData> & { is_admin: boolean }

const update = async ({id, is_admin,...body}: UserData) => {

  const response = await restRequestAuth('PUT', '/users/update', {
    body: { user_id: id, ...body}
  })

  return response
}

export default update
