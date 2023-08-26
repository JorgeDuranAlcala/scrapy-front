import axios from 'axios'

import { authConfig } from 'src/configs'
import { refreshJWT } from '.'

// ** Storage service
import { get, save } from 'src/services'

interface restRequestOptions {
  //token?: string
  body?: BodyInit | { [key: string]: any }
  params?: {
    [key: string | symbol]: any
  }
  headers?: {
    [key: string | symbol]: string
  }
}

type HTTPMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT'

const defaultHeaders = {
  'Content-Type': 'application/json',
  accept: 'application/json'
}

export async function restRequest(method: HTTPMethod = 'GET', path = '', options: restRequestOptions = {}) {
  // Destructure options variable
  let { headers } = options
  const { body, params = {} } = options

  headers = { ...headers, ...defaultHeaders }

  const response = await axios({
    url: process.env.NEXT_PUBLIC_BACKEND_URL + path,
    method,
    headers: {
      ...defaultHeaders,
      ...headers
    },
    params,
    data: typeof body == 'string' ? body : JSON.stringify(body)
  })

  return response.data
}

export async function restRequestAuth(method: HTTPMethod = 'GET', path = '', options: restRequestOptions = {}) {
  const token = get(authConfig.jwt)

  if (!token) throw 'No token'

  const { headers } = options

  const request = (auth: string) => {
    const headerAuth = 'Bearer ' + auth

    return restRequest(method, path, {
      ...options,
      headers: {
        ...headers,
        Authorization: headerAuth
      }
    })
  }

  try {
    return await request(token)
  } catch (e: any) {
    if (e.response.data.msg === 'Token has expired') {
      const newToken = await refreshJWT()
      save(authConfig.jwt, newToken)
      return await request(newToken)
    }
    throw e
  }
}
