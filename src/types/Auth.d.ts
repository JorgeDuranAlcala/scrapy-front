export type ErrCallbackType = (err?: { [key: string]: string }) => void
import { Permissions } from "./Role"

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

export type UserRole = {
  ID: number,
  CreatedAt: string
  UpdatedAt: string,
  userId: number,
  rolName: string
  specialRol: string
  tenantId: number
}

type Tenants = {
  ID: number
  name: string,
  nif: string,
  email: string
}[]

export type Account = {
  user: UserDataType
  tenants: Tenants
}

export type TenantUser = {
  userRole: UserRole
  usersPermission: Permissions
}

export type JWTStructure = {
  exp: 1682786714
  id: string
  name: string
  tenantId: string
}

export type AuthValuesType = {
  loading: boolean
  account: Account | null
  activeTenant: number | null
  tenantUser: TenantUser | null
  superAdmin?: boolean
  setLoading: (value: boolean) => void
  setAccount: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  superAdminLogin: (params: LoginParams, errorCallback?: ErrCallbackType) => void,
  logout: (redirectToLogin?: boolean) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
  switchTenant: (id: number) => void
}
