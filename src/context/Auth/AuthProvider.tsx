import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Props } from 'react-apexcharts'
import { authConfig } from 'src/configs'
import {
  ErrCallbackType,
  LoginParams,
  //RegisterParams,
  User,
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

// ** Storage Service
import { get, save, remove } from 'src/services'

const {
  storageTokenKeyName,
  storedUser
} = authConfig

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<User | null>(null)
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
          const user = get(storedUser)

          if(!user) throw "Not logged in!"

          // const response = await getUserData()

          const userData: User = JSON.parse(user)
          setUser(userData)

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
      // const { accessToken, ...user } = await login(params.email, params.password)
      const accessToken = 'testest'
      const user ={
        email: "admin@gmail.com",
        admin: true
      }
      const returnUrl = router.query.returnUrl

      save(storageTokenKeyName, accessToken)

      // Add when get getUserData entrypoint is available
      // if(params.rememberMe){
      save(storedUser, user)
      // }

      setUser(user)

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
    }
    catch(e) {
      console.log(e)
      errorCallback && errorCallback()
    }
  }
  ///////////////////////////////
  // const handleSuperAdminLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
  //   const { accessToken, ...accountData } = await superAdminLogin(params.email, params.password)
  //   const returnUrl = router.query.returnUrl

  //   const account = { user: accountData, tenants: [] }

  //   save(storageTokenKeyName, accessToken)
  //   save(isSuperAdmin, true)

  //   save(storedAccount, account)

  //   setAccount(account)
  //   setSuperAdmin(true)

  //   const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

  //   router.replace(redirectURL as string)
  // }

  ///////////////////////////////
  const handleLogout = (redirectToLogin = true) => {
    setUser(null)
    remove(storedUser)
    remove(storageTokenKeyName)
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

  const values = {
    user,
    loading,
    setLoading,
    login: handleLogin,
    // superAdminLogin: handleSuperAdminLogin,
    logout: handleLogout,
    register: handleRegister
  }

  //@ts-ignore
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthProvider
