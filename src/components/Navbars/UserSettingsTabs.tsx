import { HorizontalTabs, type TabData } from '.'

const USER_ROUTES: TabData[] = [
  {
    route: 'edit',
    text: 'profile',
    icon: 'users',
    permissions: { action: 'update', subject: 'personal-account'}
   },
  {
    route: 'edit/billing',
    text: 'billing',
    icon: 'file-text',
    permissions: { action: 'update', subject: 'tenant-settings'}
  },
  {
    route: '#',
     text: 'payroll',
     icon: 'file-euro',
    permissions: { action: 'update', subject: 'personal-account'}
  },
  {
    route: '#',
    text: 'work-calendar',
    icon: 'calendar',
    permissions: { action: 'update', subject: 'personal-account'}
  },
  {
    route: 'edit/documents',
    text: 'documents',
    icon: 'file-description',
    permissions: { action: 'update', subject: 'personal-account'}
  },
  {
    route: 'edit/notifications',
    text: 'notifications',
    icon: 'bell',
    permissions: { action: 'update', subject: 'personal-account'}
  },
  {
    route: 'edit/security',
    text: 'security',
    icon: 'lock',
    permissions: { action: 'update', subject: 'account-security'}
  }
]
const UserSettingsTabs = () => <HorizontalTabs basePath='/users' tabElements={USER_ROUTES} />

export default UserSettingsTabs
