import { authConfig } from 'src/configs'
import { restRequestAuth } from 'src/services/rest-requests'

// ** Storage Service
import { get, save } from 'src/services'

const { storageTokenKeyName } = authConfig

async function getSuperAdminData(): Promise<string> {
  const accessToken = get(storageTokenKeyName)

  try{
    if( !accessToken) throw "Missing session info"

    return accessToken
  }
  catch(e){
    const accessToken = await restRequestAuth('GET', '/core/auth/get-auth')
    save(storageTokenKeyName, accessToken)

    return accessToken
  }
}

export default getSuperAdminData
