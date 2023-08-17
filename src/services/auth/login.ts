import { restRequest } from '../rest-requests'

interface LoginResponse {
  fullname: string
  is_admin: boolean
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
