// ** React Imports
import { createContext } from 'react'
import { AuthValuesType } from 'src/types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

export default AuthContext
