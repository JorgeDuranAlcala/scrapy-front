import { restRequestAuth } from 'src/services'

const erase = async (id: number) => {
  const response = await restRequestAuth('DELETE', '/users/delete', {
    body: { user_id: id }
  })

  return response
}

export default erase
