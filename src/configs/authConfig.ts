export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  storedAccount: 'accountData',
  storedTenantUser: 'userTenant',
  isSuperAdmin: 'superAdmin',
  storedActiveTenant: 'activeTenantId',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
