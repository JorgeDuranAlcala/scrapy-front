import { authConfig } from 'src/configs'
import { restRequestAuth } from 'src/services/rest-requests'

// ** Storage Service
import { get } from 'src/services'

const { storedUser, jwt, jwtRefresh } = authConfig

async function getUserData() /*Promise<UserData>*/ {
  const user = get(storedUser)
  const token = get(jwt)
  const refreshToken = get(jwtRefresh)

  if(!user || !token || !refreshToken)
    throw "not signed in!"

  await restRequestAuth('POST', '/users/validate')

  return JSON.parse(user)
}

export default getUserData
