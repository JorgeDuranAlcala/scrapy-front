import { restRequestAuth } from 'src/services'

const remove = async (id: number) => {
  const response = await restRequestAuth('DELETE', '/users/delete', {
    body: { user_id: id }
  })

  return response
}

export default remove
