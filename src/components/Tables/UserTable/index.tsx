import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'react-i18next'
import { ThemeProvider } from '@mui/material'
import { useDispatch } from 'react-redux'

//* Icon imports
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import stackTheme from 'src/@core/styles/stackTheme'

// * Custom components
import { defaultUserForm } from 'src/components/Forms'
import { TablePagination } from 'src/components/Tables/pagination'
import { RoleSelect } from 'src/components/Shared'

// * Schemas
import { userSchema } from 'src/schemas'

// * Redux slices
import { UserTableFormDrawer, UserTableRow } from './components'
import { useQueryAndPush } from 'src/hooks'

const ROWS_PER_PAGE = 5

const rows = [
  {
    username: 'test',
    role: 'manager',
    nameAndLastname: 'test',
    phone: 'test',
    email: 'test1',
    status: 'test'
  },
  {
    username: 'test',
    role: 'manager',
    nameAndLastname: 'test',
    phone: 'test',
    email: 'test2',
    status: 'test'
  },
  {
    username: 'test',
    role: 'manager',
    nameAndLastname: 'test',
    phone: 'test',
    email: 'test3',
    status: 'test'
  },
  {
    username: 'test',
    role: 'manager',
    nameAndLastname: 'test',
    phone: 'test',
    email: 'test4',
    status: 'test'
  },
  {
    username: 'test',
    role: 'manager',
    nameAndLastname: 'test',
    phone: 'test',
    email: 'test5',
    status: 'test'
  },
  {
    username: 'test',
    role: 'manager',
    nameAndLastname: 'test',
    phone: 'test',
    email: 'test6',
    status: 'test'
  }
]

type Row = {
  username: string
  role: string
  nameAndLastname: string
  phone: string
  email: string
  status: string
}

type Props = {
  displaySelect?: boolean
  subject?: 'users' | 'tenant-system'
  tooltip?: 'user' | 'tenant'

  /* TODO: Implementar cuando se conecte con el backend
    rows: Row[]
  */
}

const ROLES_FILTER = ['manager', 'super-admin'] as const
const ROLES_ARR = ROLES_FILTER as unknown as string[]

const UserTable = ({ displaySelect = false, subject= 'users', tooltip= 'user' }: Props) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [visibleRows, setVisibleRows] = useState<typeof rows>(rows.slice(0, ROWS_PER_PAGE))

  // const { push, query } = useRouter()
  const { pushSingleQuery } = useQueryAndPush()

  const visibleRowsChange = (array: unknown) => {
    setVisibleRows(array as typeof rows)
  }

  const userForm = useForm({
    defaultValues: defaultUserForm,
    mode: 'onBlur',
    resolver: yupResolver(userSchema)
  })

  const smCell = { '&.MuiTableCell-root': { width: 80 } }
  const mdCell = { '&.MuiTableCell-root': { width: 160 } }
  const lgCell = { '&.MuiTableCell-root': { width: 240 } }

  return (
    <>
      <FormProvider {...userForm}>
          <UserTableFormDrawer />
      </FormProvider>
      <Card>
        <CardContent>
          <ThemeProvider theme={stackTheme}>
            <Stack justifyContent={'space-between'} alignItems='center' mb={5}>
              <Stack direction='row' spacing={5} alignItems='center' >
                <TextField
                  sx={{minWidth: 300}}
                  size='small'
                  placeholder={t('search') as string} />
                {displaySelect && <RoleSelect roles={ROLES_ARR} />}
              </Stack>
              <Button variant='contained' onClick={() => pushSingleQuery('create', 't')}>
                {t('add-user')}
              </Button>
            </Stack>
          </ThemeProvider>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              {/* Table headers */}
              <TableHead>
                <TableRow>
                  <TableCell>{t('user')}</TableCell>
                  <TableCell sx={mdCell} align='left'>
                    {t('role')}
                  </TableCell>
                  <TableCell align='left'>{t('name-and-lastname')}</TableCell>
                  <TableCell sx={lgCell} align='left'>
                    {t('phone_one')}
                  </TableCell>
                  <TableCell sx={lgCell} align='left'>
                    {t('email')}
                  </TableCell>
                  <TableCell sx={smCell} size='small' align='left'>
                    {t('status')}
                  </TableCell>
                  <TableCell sx={smCell} align='center'>
                    {t('options')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map(row => (
                  <UserTableRow
                    key={row.email}
                    row={row}
                    userForm={userForm}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination rows={rows} setVisibleRows={visibleRowsChange} />
        </CardContent>
      </Card>
    </>
  )
}

export default UserTable

// TODO: Implementar cuando tengas acceso al backend
// type TableProps = {
//   rows: {
//     user: string
//     role: string
//     name: string
//     lastName: string
//     phone: string
//     email: string
//     status: string
//   }[]
// }
