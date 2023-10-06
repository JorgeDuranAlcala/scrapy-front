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

/**
 * This function will check if the body isn't a object
 * and if the header is multipart/form-data
 * If it isn't a object or the header isn't multipart/form-data
 * return a formData object
 */
const formDataModuleSupport = (body: any, options: restRequestOptions = {}) => {
  if (options.headers?.['Content-Type'] !== 'multipart/form-data' || typeof body !== 'object') return body
  const formData = new FormData()
  const data = body as { [key: string]: any }
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value)
  }
  return formData
}

/*
 * This function will generate the body for the request
 */
export const generateBody = (body: any) =>
  typeof body === 'string' || body instanceof FormData ? body : JSON.stringify(body)

export async function restRequest(method: HTTPMethod = 'GET', path = '', options: restRequestOptions = {}) {
  // Destructure options variable
  let { headers } = options
  const { body, params = {} } = options

  headers = { ...defaultHeaders, ...headers }

  const response = await axios({
    url: process.env.NEXT_PUBLIC_BACKEND_URL + path,
    method,
    headers,
    params,
    data: generateBody(body)
  })

  return response.data
}

export async function restRequestAuth(method: HTTPMethod = 'GET', path = '', options: restRequestOptions = {}) {
  const token = get(authConfig.jwt)

  if (!token) throw 'No token'

  const { headers } = options

  options.body = formDataModuleSupport(options.body, options)

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
