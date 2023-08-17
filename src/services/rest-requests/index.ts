import { authConfig } from 'src/configs'
import axios from 'axios'

// ** Storage service
import { get } from 'src/services'

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
      ...headers
    },
    params,
    data: typeof body == 'string' ? body : JSON.stringify(body)
  })

  return response.data
}

export async function restRequestAuth(method: HTTPMethod = 'GET', path = '', options: restRequestOptions = {}) {
  const token = get(authConfig.storageTokenKeyName)

  if (!token) throw 'No token'

  const headerAuth = 'Bearer ' + token
  const { headers } = options

  return restRequest(method, path, {
    ...options,
    headers: {
      ...headers,
      Authorization: headerAuth
    }
  })
}
