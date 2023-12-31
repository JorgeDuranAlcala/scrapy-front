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

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return

    }
    if(auth.user)
      router.push('/listings/fotocasa')
  }, [])

  return <Spinner />
}

Home.acl = {
  action: 'see',
  subject: 'user-pages'
}

export default Home
