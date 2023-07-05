import Box from "@mui/material/Box"

import { UserTable } from 'src/components/Tables'
import { UsersLayout } from './components'
import { UsersManagementTabs } from 'src/components/Navbars'

const TableList = () => {
  //TODO: Pedir informacion del backend y pasarla a user table bajo el
  // prop llamado 'rows'

  return (
    <UsersLayout>
      <Box mb={5}>
        <UsersManagementTabs/>
      </Box>
      <UserTable displaySelect />
    </UsersLayout>
  )
}

TableList.acl = {
  action: 'read',
  subject: 'users'
}

export default TableList
