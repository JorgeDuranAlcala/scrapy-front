import { authConfig } from 'src/configs'
import { restRequestAuth } from 'src/services/rest-requests'
import {type User } from 'src/types'

// ** Storage Service
import { get } from 'src/services'

// const { storedUser } = authConfig

async function getUserData() /*Promise<UserData>*/ {
  // const account = get(storedAccount)
  // const activeTenant = get(storedActiveTenant)

  // if(!account || !activeTenant) throw "Missing session info"

  // const acct = JSON.parse(account)
  // const actTenant = JSON.parse(activeTenant)

  // const tenantUser: TenantUser = await restRequestAuth('GET', '/tenant/auth/get-tenant')

  return 'test'
}

export default getUserData
