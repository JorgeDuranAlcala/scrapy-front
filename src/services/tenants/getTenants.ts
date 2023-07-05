import { restRequestAuth } from "src/services/rest-requests";
import { Tenants } from 'src/types'

const getTenants = async (): Promise<Tenants> => {
  return restRequestAuth('GET', '/tenant/auth/get-tenants')
}

export default getTenants
