// ** MUI Imports
import Stack from '@mui/material/Stack'

import { EmployeeEditForm } from "./_components"
import { UserSettingsTabs } from "src/components/Navbars"

const EditEmployee = () => (
    <Stack spacing={6}>
      <UserSettingsTabs />
      <EmployeeEditForm/>
    </Stack>

)

EditEmployee.acl = {
  action: 'update',
  subject: 'personal-account'
}

export default EditEmployee
