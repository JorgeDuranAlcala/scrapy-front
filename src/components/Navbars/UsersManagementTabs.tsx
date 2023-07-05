import { HorizontalTabs, type TabData } from '.'

const USERS_MANAGEMENT_ROUTES: TabData[] = [
  {
    route: '',
    text: 'users',
    icon: 'users',
    permissions: { action: 'read', subject: 'users' }
  },
  {
    route: 'roles',
    text: 'roles',
    icon: 'lock',
    permissions: { action: 'read', subject: 'users' }
  }
]

const UserManagementTabs = () => (
<HorizontalTabs
  basePath='/users' tabElements={USERS_MANAGEMENT_ROUTES} />)

export default UserManagementTabs
