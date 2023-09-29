import { authConfig } from 'src/configs'
import { restRequestAuth } from 'src/services/rest-requests'
import {type User } from 'src/types'

// ** Storage Service
import { get } from 'src/services'

const { storedUser, jwt, jwtRefresh } = authConfig

async function getUserData() /*Promise<UserData>*/ {
  const user = get(storedUser)
  const token = get(jwt)
  const refreshToken = get(jwtRefresh)

  if(!user || !token || !refreshToken)
    throw "not signed in!"

  return JSON.parse(user)
}

export default getUserData
