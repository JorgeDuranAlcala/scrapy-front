export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  storedUser: 'user',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
