export const PERMISSIONS = [
  { code: 'users', label: 'users' },
  { code: 'accounts', label: 'accounts' },
  { code: 'products', label: 'products' },
  { code: 'leads', label: 'leads' },
  { code: 'documentManagement', label: 'document-management' },
  { code: 'billing', label: 'billing' },
  { code: 'accountingAndTaxes', label: 'accounting-and-taxes' },
  { code: 'labor', label: 'labor' }
]
export type Permissions = ReturnType <typeof allPermissions>

export const allPermissions = (value: boolean) =>
    PERMISSIONS.map(({ code }) => ({code, write: value, read: value}))

export type Role = {
  role: string
  permissions: Permissions
}
