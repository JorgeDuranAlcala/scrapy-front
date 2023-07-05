import { authConfig } from 'src/configs'
import isTokenExpired from './isTokenExpired'
import axios from "axios"

// ** Storage service
import { get } from 'src/services'

interface restRequestOptions {
  //token?: string
  body?: BodyInit | { [key: string]: any }
  query?: {
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
  const { body, query } = options;


  headers = { ...headers, ...defaultHeaders }

  // Agrega el query al path en caso de ser otorgado
  if (query)
    path += '?' + new URLSearchParams(query).toString()

    // Backend request
    ///////////////////////////
    try {

      const response = await axios({
        url: process.env.NEXT_PUBLIC_BACKEND_URL + path,
        method,
        headers: {
          ...headers,
        },
        data: typeof body == 'string' ? body : JSON.stringify(body)
      })

      // Error handling
      /////////////////////////////////
      if (response.status < 200 || response.status > 299) {
        //TODO: Send some error
        throw 'Some error'
      }

      const successReturn = response.data

      return successReturn.data
    } catch (error) {
    console.log("An error happened while making the request: ", error)
  }
}

export async function restRequestAuth(method: HTTPMethod = 'GET', path = '', options: restRequestOptions ={}) {
  //TODO: if (IsTokenContain in AuthTokenService)
  //TODO: service AuthTokenService->storageService(token)
  const token = get(authConfig.storageTokenKeyName);

  if (!token) throw 'No token'

  const headerAuth = 'Bearer ' + token
  const { headers } = options;

  return restRequest(method, path, {
    ...options,
    headers: {
    ...headers,
    Authorization: headerAuth
  }})
}


