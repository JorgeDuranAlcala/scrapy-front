import { authConfig } from 'src/configs'
import { restRequestTenantAuth } from 'src/services/rest-requests'
import { Account, TenantUser } from 'src/types'

// ** Storage Service
import { get } from 'src/services'

type UserData = {
  acct: Account,
  tenantUser: TenantUser
  actTenant: number
}

const { storedAccount, storedActiveTenant } = authConfig

async function getUserData(): Promise<UserData> {
  const account = get(storedAccount)
  const activeTenant = get(storedActiveTenant)

  if(!account || !activeTenant) throw "Missing session info"

  const acct = JSON.parse(account)
  const actTenant = JSON.parse(activeTenant)

  const tenantUser: TenantUser = await restRequestTenantAuth('GET', '/tenant/auth/get-tenant')

  return { acct, actTenant, tenantUser}
}

export default getUserData
