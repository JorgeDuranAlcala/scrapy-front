import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { UserFormData } from 'src/components/Forms'
import { ActionButton } from 'src/components/Shared'
import { useTranslation } from 'react-i18next'

interface TUserTableRow {
  row: UserFormData
  openEditForm: (data: UserFormData) => void
  openDeleteModal: (id: number) => void
  openEmailDrawer: (email: string) => void
}

function UserTableRow({ row, openEditForm, openDeleteModal, openEmailDrawer }: TUserTableRow) {
  const { t } = useTranslation()

  return (
    <TableRow key={row.email}>
      <TableCell align='left'>{row.fullname}</TableCell>
      <TableCell align='left'>{row.phone}</TableCell>
      <TableCell sx={{width: "25%"}} align='left'>{row.email}</TableCell>
      <TableCell align='center'>
        <Stack justifyContent='center' direction='row' spacing={0.25}>
          <ActionButton
            title={t('see')}
            icon={'tabler:eye'}
            buttonProps={{
              onClick: () => {
                openEditForm(row)
              }
            }}
          />
          <ActionButton
            title={t('delete')}
            icon={'tabler:trash'}
            buttonProps={{
              onClick: () => {
                openDeleteModal(row.id as number)
              }
            }}
          />
          <ActionButton
            title={t('send-email')}
            icon={'tabler:mail'}
            buttonProps={{
              onClick: () => {
                openEmailDrawer(row.email)
              }
            }}
          />
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default UserTableRow
