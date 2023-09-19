import { restRequest } from '../rest-requests'

interface LoginResponse {
  fullname: string
  is_admin: boolean
  jwt: string
  refresh_token: string
}
async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await restRequest('POST', '/users/login', {
    body: {
      email,
      password,
    }
  })

  return response
}

export default login
