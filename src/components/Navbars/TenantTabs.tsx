import { HorizontalTabs, type TabData } from '.'

const TENANT_ROUTES: TabData[] = [
  {
    route: 'edit',
    text: 'tax-data',
    icon: 'credit-card',
    permissions: { action: 'read', subject: 'tenant-system' }
  },
  {
    route: 'edit/bank',
    text: 'banking-data',
    icon: 'building-bank',
    permissions: { action: 'read', subject: 'tenant-system' }
  },
  {
    route: 'billing-history',
    text: 'billing-history',
    icon: 'rotate-clockwise-2',
    permissions: { action: 'read', subject: 'tenant-system' }
  },
  {
    route: 'plugins-summary',
    text: 'plugins',
    icon: 'rotate-clockwise-2',
    permissions: { action: 'read', subject: 'tenant-system' }
  }
]
const TenantTabs = () => <HorizontalTabs basePath='/tenants' tabElements={TENANT_ROUTES} />

export default TenantTabs
