// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks'


/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  switch (role) {
    case 'superAdmin':
      return '/tenants'
    case 'admin':
      return '/users'
    case 'gestor':
      return '/accounts'
    case 'normal':
      return '/accounts'
  }
  return ''
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (auth.tenantUser || auth.superAdmin) {
      let role = 'superAdmin'

      if(auth.tenantUser)
        role = auth.tenantUser.userRole.specialRol

      const homeRoute = getHomeRoute(role)

      homeRoute !== '' ? router.replace(homeRoute) : auth.logout()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home
