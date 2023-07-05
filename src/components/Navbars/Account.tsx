import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { HorizontalTabs, type TabData } from './'

const ACCOUNT_ROUTES: TabData[] = [
  {
    route: 'tax-data',
    text: 'tax-data',
    icon: 'users',
    permissions: { action: 'read', subject: 'accounts' }
  },
  {
    route: 'commercial-specs',
    text: 'commercial-specs',
    icon: 'lock',
    permissions: { action: 'read', subject: 'accounts' }
  },
  {
    route: 'other-addresses',
    text: 'other-addresses',
    icon: 'lock',
    permissions: { action: 'read', subject: 'accounts' }
  },
  {
    route: 'contacts',
    text: 'contacts',
    icon: 'file-text',
    permissions: { action: 'read', subject: 'accounts' }
  },
  {
    route: 'documents',
    text: 'documents',
    icon: 'file-text',
    permissions: { action: 'read', subject: 'accounts' }
  }
]

const AccountTabs = ({ children }: Props) => (
  <Stack spacing={5} alignItems='start'>
    <HorizontalTabs basePath='/accounts' tabElements={ACCOUNT_ROUTES} />
    <Box width={'100%'}>{children}</Box>
  </Stack>
)

type Props = { children: JSX.Element }

export default AccountTabs
