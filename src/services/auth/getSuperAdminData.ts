import { authConfig } from 'src/configs'
import { restRequestAuth } from 'src/services/rest-requests'
import { Account } from 'src/types'

// ** Storage Service
import { get, save } from 'src/services'

type UserData = {
  userData: Account,
  accessToken: string
}

const { storedAccount, storageTokenKeyName } = authConfig

async function getSuperAdminData(): Promise<UserData> {
  const account = get(storedAccount)
  const accToken = get(storageTokenKeyName)

  try{
    if(!account || !accToken) throw "Missing session info"

    const acct: Account = JSON.parse(account)
    const token: string = JSON.parse(accToken)

    return { userData: acct, accessToken: token }
  }
  catch(e){
    const { userData, accessToken }: UserData = await restRequestAuth('GET', '/core/auth/get-auth')
    save(storageTokenKeyName, accessToken)

    return { userData, accessToken }
  }
}

export default getSuperAdminData
