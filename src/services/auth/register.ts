import { RegisterParams } from 'src/types'
import { restRequest } from '../rest-requests'

interface register {
  id: string
  Tenant_name: string
  Nif: string
  Street: string
  Postcard: string
  Province: string
  City: string
  Phone: string
  Email: string
  Users_max: number
  Bank_name: string
  Bank_account: string
  Tenant_state: string
}

// Despues de la implementacion se debe cambiar el tipado de registerObject de:
// registerObject?: RegisterParams | string
// a
// registerObject: RegisterParams

async function register(registerObject?: RegisterParams | string): Promise<register> {
  return {
    id: 'uwkdebqaelhlgzs',
    Tenant_name:
      (typeof registerObject != 'string' ? registerObject?.tenant_data.tenant_name : registerObject) || 'dsvcrbrb3',
    Nif: 'elit',
    Street: 'tempor in sit velit',
    Postcard: 'Ut minim',
    Province: 'aliqua',
    City: 'occaecat consequat sint non',
    Phone: 'hsftjhytfdhdtyh',
    Email: 'netdhbe msdgfbinimwrgb adfgbv fugiat',
    Users_max: 100,
    Bank_name: 'fghmnhjghjm',
    Bank_account: 'ofghjnfghj',
    Tenant_state: 'IN_ACTIVE'
  }

  // return await restRequest('POST', "/API/Create_tenant/v1", {
  //   body: registerObject
  // })
}

export default register
