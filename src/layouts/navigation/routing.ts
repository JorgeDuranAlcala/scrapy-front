import { useAuth } from "src/hooks"

// TODO: Display the Tenant-System navlinks or the normal ERP Tenant navlinks
// Based on whether the user is a superAdmin and the activeTenant is null

const useNavigationRouting = () => {
  const auth = useAuth()

  return [
    {
      title: 'Tenants',
      path: "/tenants",
      action: 'read',
      subject: 'tenant-system',
      icon: "tabler:building-store"
    },
    {
      title: 'users',
      path: '/tenants/users',
      action: 'read',
      subject: 'tenant-system',
      icon: 'tabler:users-group'
    },
    {
      title: 'Plugins',
      path: '/tenants/plugins',
      action: 'read',
      subject: 'tenant-system',
      icon: "tabler:apps"
    },
    {
      title: 'ledger-accounts',
      path: '/tenants/ledger-accounts',
      action: 'read',
      subject: 'tenant-system',
      icon: "tabler:report-search"
    },
    {
      title: auth.tenantUser?.userRole.specialRol !== 'gestor' ? 'accounts' : 'providers',
      icon: 'tabler:smart-home',
      path: '/accounts',
      action: 'read',
      subject: 'accounts'
    },
  ]
}


export default useNavigationRouting
