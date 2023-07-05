import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { UseFormReturn } from 'react-hook-form'

import Icon from 'src/@core/components/icon'

import { UserFormData } from 'src/components/Forms'
import { ActionButton } from 'src/components/Shared'
import { useTranslation } from 'react-i18next'


interface TUserTableRow {
  row: {
    username: string
    role: string
    nameAndLastname: string
    phone: string
    email: string
    status: string
  }
  userForm: UseFormReturn<UserFormData, any>
}

function UserTableRow({ row, userForm}: TUserTableRow) {
  const { t }= useTranslation()
  // const dispatch = useDispatch()
  // const { open } = componentOpen.actions


  const handleEditFormOpen = (data: typeof row) => {
    userForm.reset(data)
  }

  return (
    <>
      <TableRow key={row.email}>
        <TableCell size='small' align='left'>
          {row.username}
        </TableCell>
        <TableCell size='small' align='left'>
          {row.role}
        </TableCell>
        <TableCell align='left'>{row.nameAndLastname}</TableCell>
        <TableCell align='left'>{row.phone}</TableCell>
        <TableCell align='left'>{row.email}</TableCell>
        <TableCell align='left'>{row.status}</TableCell>
        <TableCell align='center'>
          <Stack justifyContent='center' direction='row' spacing={0.25}>
            <ActionButton title={t('see')} icon={'tabler:eye'}
              buttonProps={{onClick:() => {handleEditFormOpen(row)}}}
            />
            <ActionButton title={t('delete')} icon={'tabler:trash'}
              buttonProps={{onClick:() => {console.log('delete')}}}
            />
            <ActionButton title={t('send-email')} icon={'tabler:mail'}
              buttonProps={{onClick:() => {console.log('email')}}}
            />
          </Stack>
        </TableCell>
      </TableRow>
    </>
  )
}

export default UserTableRow
