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

//* Icon imports
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import stackTheme from 'src/@core/styles/stackTheme'

// * Custom components
import { defaultUserForm } from 'src/components/Forms'
import { TablePagination } from 'src/components/Tables/pagination'
import { EmailDrawer, DeleteModal } from 'src/components/Shared'

// * Schemas
import { userSchema } from 'src/schemas'

import { useDisclosure } from 'src/hooks'

// * Redux slices
import { UserTableFormDrawer, UserTableRow } from './components'

const ROWS_PER_PAGE = 5

const rows = [
  {
    nameAndLastname: 'test',
    phone: 'test',
    DNI: '234',
    job: '',
    salary: undefined,
    paymentMethod: '',
    password: 'akd',
    comments: 'este es un comentario',
    email: 'test1',
    status: 'test'
  },
  {
    nameAndLastname: 'test',
    phone: 'test',
    DNI: '234',
    job: '',
    salary: undefined,
    paymentMethod: '',
    password: 'akd',
    comments: 'este es un comentario',
    email: 'test2',
    status: 'test'
  },
  {
    nameAndLastname: 'test',
    phone: 'test',
    DNI: '234',
    job: '',
    salary: undefined,
    paymentMethod: '',
    password: 'akd',
    comments: 'este es un comentario',
    email: 'test3',
    status: 'test'
  },
  {
    nameAndLastname: 'test',
    phone: 'test',
    DNI: '234',
    job: '',
    salary: undefined,
    paymentMethod: '',
    password: 'akd',
    comments: 'este es un comentario',
    email: 'test4',
    status: 'test'
  },
  {
    nameAndLastname: 'test',
    phone: 'test',
    DNI: '234',
    job: '',
    salary: undefined,
    paymentMethod: '',
    password: 'akd',
    comments: 'este es un comentario',
    email: 'test5',
    status: 'test'
  },
  {
    nameAndLastname: 'test',
    phone: 'test',
    DNI: '234',
    job: '',
    salary: undefined,
    paymentMethod: '',
    password: 'akd',
    comments: 'este es un comentario',
    email: 'test6',
    status: 'test'
  }
]

const UserTable = () => {
  const { t } = useTranslation()
  const [editModalOpened, editFormModal] = useDisclosure()
  const [deleteModalOpened, deleteModal] = useDisclosure()
  const [emailDrawerOpened, emailDrawer] = useDisclosure()
  const [email, setEmail] = useState('')
  const [id, setID] = useState('')

  const [visibleRows, setVisibleRows] = useState<typeof rows>(rows.slice(0, ROWS_PER_PAGE))

  const visibleRowsChange = (array: unknown) => {
    setVisibleRows(array as typeof rows)
  }

  const userForm = useForm({
    defaultValues: defaultUserForm,
    mode: 'onBlur',
    resolver: yupResolver(userSchema)
  })

  const openEditForm = (data: typeof defaultUserForm) => {
    userForm.reset(data)
    editFormModal.open()
  }

  const openEmailDrawer = (email: string) => {
    setEmail(email)
    emailDrawer.open()
  }

  const openDeleteModal = (id: string) => {
    setID(id)
    deleteModal.open()
  }

  const deleteUser = () => {
    console.log('delete id: ', id)
  }

  const smCell = { '&.MuiTableCell-root': { width: 80 } }
  const lgCell = { '&.MuiTableCell-root': { width: 240 } }

  return (
    <>
      <DeleteModal modalOpen={deleteModalOpened} close={deleteModal.close}
        handleDelete={deleteUser} name='usuario' gender='este'
      />
      <EmailDrawer recipients={[email]} open={emailDrawerOpened} toggle={emailDrawer.close}/>
      <FormProvider {...userForm}>
          <UserTableFormDrawer opened={editModalOpened} close={editFormModal.close} />
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
              </Stack>
              <Button variant='contained' onClick={() => {openEditForm(defaultUserForm)}}>
                {t('add-user')}
              </Button>
            </Stack>
          </ThemeProvider>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>{t('user')}</TableCell>
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
                    {...{openEmailDrawer, openDeleteModal, openEditForm}}
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
