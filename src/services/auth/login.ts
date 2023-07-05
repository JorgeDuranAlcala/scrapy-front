import { restRequest } from '../rest-requests'
import { type User } from 'src/types'

interface Login extends User {
  accessToken: string
}
async function login(email: string, password: string): Promise<Login> {

  return await restRequest('POST', '/tenant/auth/login', {
    body: {
      email,
      password,
    }
  })
}

export default login
