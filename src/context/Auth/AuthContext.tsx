// ** React Imports
import { createContext } from 'react'
import { AuthValuesType } from 'src/types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  account: null,
  activeTenant: null,
  tenantUser: null,
  loading: true,
  setAccount: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  superAdminLogin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  switchTenant: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

export default AuthContext
