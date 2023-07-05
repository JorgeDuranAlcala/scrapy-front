import { JWTStructure } from 'src/types'
import jwtDecode from 'jwt-decode'

function isTokenExpired(token: string) {
  // Token validation
  try {
    const decodedToken: JWTStructure = jwtDecode(`${token}`)

    //si ya paso la fecha de expiración
    if (decodedToken.exp < Date.now() / 1000) {
      window.dispatchEvent(new Event('erp--tried_fetch_with_expired_token'))
      return true
    }

    return false

  } catch (error) {
    window.dispatchEvent(new Event('erp--tried_fetch_with_expired_token'))
    return true
  }
}

export default isTokenExpired
