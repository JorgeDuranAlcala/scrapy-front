// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks'

// ** Auth Config
import { authConfig } from 'src/configs'

// ** Storage Service
import { get } from 'src/services'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()


  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (get(authConfig.storedUser)) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  if (auth.loading || auth.user) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
