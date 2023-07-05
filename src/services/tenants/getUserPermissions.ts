import {restRequestTenantAuth} from 'src/services/rest-requests'
import { TenantUser } from 'src/types'


async function getUserPermissions(tenantId: number): Promise<TenantUser> {
  return await restRequestTenantAuth('GET', '/tenant/auth/get-tenant', {
    headers: { Tenant: tenantId.toString() }
  })
}

export default getUserPermissions
