import { useContext } from 'react'
import { AuthContext } from 'src/context'

const useAuth = () => useContext(AuthContext)

export default useAuth
