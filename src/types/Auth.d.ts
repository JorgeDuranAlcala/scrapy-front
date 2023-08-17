export type ErrCallbackType = (err?: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type User = {
  fullname: string
  is_admin: boolean
}

export type AuthValuesType = {
  loading: boolean
  user: User | null
  setLoading: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  logout: (redirectToLogin?: boolean) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
