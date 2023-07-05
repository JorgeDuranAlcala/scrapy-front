export type ErrCallbackType = (err?: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

// export type RegisterParams = {
//   email: string
//   username: string
//   password: string
// }

export type RegisterParams = {
  tenant_data: {
    city: string
    email: string
    nif: string
    phone: string
    postcard: string
    province: string
    street: string
    tenant_name: string
    bank_name: string
    banck_account: string
  }
  admin_data: {
    city: string
    coin: string
    country: string
    direction: string
    dni: string
    email: string
    id: string
    language: string
    lastname: string
    password: string
    phone: string
    postcard: string
    province: string
    username: string
    user_state: string
  }
}

export type UserDataType = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  firstName: string
  lastName: string
  email: string
  contact: string
}


export type User = {
  admin: boolean,
  email: string
}



export type JWTStructure = {
  exp: 1682786714
  id: string
  name: string
  tenantId: string
}

export type AuthValuesType = {
  loading: boolean
  user: User | null
  setLoading: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  adminLogin: (params: LoginParams, errorCallback?: ErrCallbackType) => void,
  logout: (redirectToLogin?: boolean) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
