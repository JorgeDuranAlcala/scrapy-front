import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Props } from 'react-apexcharts'
import { authConfig } from 'src/configs'
import {
  ErrCallbackType,
  LoginParams,
  //RegisterParams,
  Account,
  TenantUser
} from 'src/types'
import AuthContext from './AuthContext'
import { useQueryClient } from '@tanstack/react-query'

// ** Auth service
import {
  getUserData,
  getSuperAdminData,
  login,
  register,
  superAdminLogin
} from 'src/services/auth'

// ** Tenant service
import { getUserPermissions } from 'src/services/tenants'

// ** Storage Service
import { get, save, remove } from 'src/services'

const {
  storedAccount,
  storedTenantUser,
  storedActiveTenant,
  storageTokenKeyName,
  isSuperAdmin
} = authConfig

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [account, setAccount] = useState<Account | null>(null)
  const [activeTenant, setActiveTenant] = useState<number | null>(null)
  const [tenantUser, setTenantUser] = useState<TenantUser | null>(null)
  const [superAdmin, setSuperAdmin] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const queryClient = useQueryClient()

  // ** Hooks
  const router = useRouter()

  // Page load initial actions
  ///////////////////////////////
  ///////////////////////////////
  useEffect(() => {
    const initAuth = async () => {
      try{
        if(get(storageTokenKeyName)){
          let acct: Account

          if(get(isSuperAdmin)){
            const { userData } = await getSuperAdminData()
            acct = userData
            setSuperAdmin(true)
          }
          else {
            const response = await getUserData()

            const {actTenant, tenantUser} = response
            acct = response.acct

            setActiveTenant(actTenant)
            setTenantUser(tenantUser)
          }

          setAccount(acct)
        }
      }catch(e){
        console.log(e)
        handleLogout()
      }
      setLoading(false)
    }

    initAuth()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  ///////////////////////////////
  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    try{
      const { accessToken, ...account } = await login(params.email, params.password)
      const returnUrl = router.query.returnUrl

      save(storageTokenKeyName, accessToken)

      // Add when get getUserData entrypoint is available
      // if(params.rememberMe){
      save(storedAccount, account)
      // }

      setAccount(account)

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      if(account.tenants.length === 1){
        await handleTenantChange(account.tenants[0].ID, false)
        router.replace(redirectURL as string)
      }
    }
    catch(e) {
      console.log(e)
      errorCallback && errorCallback()
    }
  }
  ///////////////////////////////
  const handleSuperAdminLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const { accessToken, ...accountData } = await superAdminLogin(params.email, params.password)
    const returnUrl = router.query.returnUrl

    const account = { user: accountData, tenants: [] }

    save(storageTokenKeyName, accessToken)
    save(isSuperAdmin, true)

    save(storedAccount, account)

    setAccount(account)
    setSuperAdmin(true)

    const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

    router.replace(redirectURL as string)
  }

  ///////////////////////////////
  const handleLogout = (redirectToLogin = true) => {
    setAccount(null)
    setTenantUser(null)
    setActiveTenant(null)
    setSuperAdmin(false)
    remove(storedAccount)
    remove(storedTenantUser)
    remove(storedActiveTenant)
    remove(storageTokenKeyName)
    remove(isSuperAdmin)
    queryClient.removeQueries()

    if (redirectToLogin) router.push('/login')
  }

  ///////////////////////////////
  const handleRegister = async (
    params: {
      email: string
      username: string
      password: string
    },
    errorCallback?: ErrCallbackType
  ) => {
    try {
      const response = await register(params.username)

      // if (!response) {
      //   if (errorCallback) errorCallback(res.data.error)
      // } else {
      //   handleLogin({
      //     email: params.email,
      //     password: params.password
      //   })
      // }
    } catch (error) {
      console.log(error)
      // errorCallback && errorCallback(error)
    }

    // axios
    //   .post(authConfig.registerEndpoint, params)
    //   .then(res => {
    //     if (res.data.error) {
    //       if (errorCallback) errorCallback(res.data.error)
    //     } else {
    //       handleLogin({
    //         email: params.email,
    //         password: params.password
    //       })
    //     }
    //   })
    //   .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const handleTenantChange = async (id: number, redirectToHome = true) => {
    try{
      const tenantUser = await getUserPermissions(id)

      if(!tenantUser) throw('Error while selecting tenant')

      setActiveTenant(id)
      setTenantUser(tenantUser)
      save(storedActiveTenant, id)
      save(storedTenantUser, tenantUser)
      queryClient.removeQueries()

      if(redirectToHome) router.replace('/')
    }
    catch(e) {
      console.log(e)
    }
  }

  const values = {
    account,
    activeTenant,
    tenantUser,
    loading,
    superAdmin,
    setAccount,
    setLoading,
    login: handleLogin,
    superAdminLogin: handleSuperAdminLogin,
    logout: handleLogout,
    switchTenant: handleTenantChange,
    register: handleRegister
  }

  //@ts-ignore
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthProvider
