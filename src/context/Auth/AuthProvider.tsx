import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Props } from 'react-apexcharts'
import { authConfig } from 'src/configs'
import {
  ErrCallbackType,
  LoginParams,
  User,
} from 'src/types'
import AuthContext from './AuthContext'
import { useQueryClient } from '@tanstack/react-query'

// ** Auth service
import {
  getUserData,
  login,
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
  useEffect(() => {
    const initAuth = async () => {
      try{
          const savedUser = get(storedUser)

          if(!savedUser) throw "Not logged in!"

          // const response = await getUserData()

          const userData: User = JSON.parse(savedUser)
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
      const {email, password, rememberMe} = params
      const response = await login(email, password)

      const returnUrl = router.query.returnUrl

      // Add when get getUserData entrypoint is available
      // if(params.rememberMe){
      save(storedUser, response)
      // }

      setUser(response)

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/listings/fotocasa'

      router.replace(redirectURL as string)
    }
    catch(e) {
      console.log(e)
      errorCallback && errorCallback()
    }
  }

  ///////////////////////////////
  const handleLogout = (redirectToLogin = true) => {
    setUser(null)
    remove(storedUser)
    remove(storageTokenKeyName)
    queryClient.removeQueries()

    if (redirectToLogin) router.push('/login')
  }

  const values = {
    user,
    loading,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  }

  //@ts-ignore
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthProvider
