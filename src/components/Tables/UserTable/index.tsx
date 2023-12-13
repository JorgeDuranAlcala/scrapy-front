import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { ThemeProvider } from '@mui/material'

import { useTranslation } from 'react-i18next'

//* Third Party imports
import { useMutation } from '@tanstack/react-query'
import { useForm, FormProvider, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

import stackTheme from 'src/@core/styles/stackTheme'

// * Custom components
import { type UserFormData } from 'src/components/Forms'
import { EmailDrawer, DeleteModal } from 'src/components/Shared'

// * Schemas
import { userSchema } from 'src/schemas'

// * Services
import { create, update, erase } from 'src/services/users'

// * Custom hooks
import { useDisclosure } from 'src/hooks'

import { UserTableFormDrawer, UserTableRow } from './components'
import { AxiosError } from 'axios'
import { DNIGen } from 'src/utils/dni'

type Props = {
  rows: UserFormData[]
  setSearch: (search: string) => void
  search: string
  refetch: () => void
}

const UserTable = ({ rows, setSearch, search, refetch }: Props) => {
  const { t } = useTranslation()
  const [editModalOpened, editFormModal] = useDisclosure()
  const [deleteModalOpened, deleteModal] = useDisclosure()
  const [emailDrawerOpened, emailDrawer] = useDisclosure()
  const [email, setEmail] = useState('')

  const userForm = useForm({
    defaultValues: userSchema.getDefault(),
    mode: 'onBlur',
    resolver: yupResolver(userSchema)
  })

  const id = userForm.watch('id')

  const openEditForm = (data?: UserFormData) => {
    userForm.reset(data)
    editFormModal.open()
  }

  const openEmailDrawer = (email: string) => {
    setEmail(email)
    emailDrawer.open()
  }

  const openDeleteModal = (id: number) => {
    userForm.setValue('id', id)
    deleteModal.open()
  }

  const createUser = useMutation({
    mutationKey: ['create-user'],
    mutationFn: create,
    onError: (e: AxiosError) => {
      toast.error(e.message)
    },
    onSuccess: () => {
      toast.success('Usuario creado')
      refetch()
      editFormModal.close()
    }
  })

  const updateUser = useMutation({
    mutationKey: ['update-user'],
    mutationFn: update,
    onError: (e: AxiosError) => {
      toast.error(e.message)
    },
    onSuccess: () => {
      toast.success('Usuario actualizado')
      refetch()
      editFormModal.close()
    }
  })

  const deleteUser = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: erase,
    onError: (e: AxiosError) => {
      toast.error(e.message)
    },
    onSuccess: () => {
      toast.success('Usuario eliminado')
      refetch()
      deleteModal.close()
    }
  })

  const removeUser = () => {
    deleteUser.mutate(id as number)
  }

  const onSubmit = (data: FieldValues) => {
    data = { ...data, dni: DNIGen(Number(data.dni)) }
    if (!id) createUser.mutate(data as UserFormData)
    else updateUser.mutate(data as UserFormData)
  }

  const smCell = { '&.MuiTableCell-root': { width: 80 } }
  const lgCell = { '&.MuiTableCell-root': { width: 240 } }

  return (
    <>
      <DeleteModal
        modalOpen={deleteModalOpened}
        close={deleteModal.close}
        handleDelete={removeUser}
        name='usuario'
        gender='este'
        disable={deleteUser.isLoading}
      />
      <EmailDrawer recipients={[email]} open={emailDrawerOpened} toggle={emailDrawer.close} />
      <FormProvider {...userForm}>
        <UserTableFormDrawer
          opened={editModalOpened}
          close={editFormModal.close}
          submit={onSubmit}
          loading={createUser.isLoading}
        />
      </FormProvider>
      <ThemeProvider theme={stackTheme}>
        <Stack justifyContent={'space-between'} alignItems='center' mb={5}>
          <Stack direction='row' spacing={5} alignItems='center'>
            <TextField
              value={search}
              onChange={e => {
                setSearch(e.target.value)
              }}
              sx={{ minWidth: 300 }}
              size='small'
              placeholder={t('search') as string}
            />
          </Stack>
          <Button
            variant='contained'
            onClick={() => {
              openEditForm(userSchema.getDefault())
            }}
          >
            {t('add-user')}
          </Button>
        </Stack>
      </ThemeProvider>

      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>{t('name-and-lastname')}</TableCell>
            <TableCell sx={lgCell} align='left'>
              {t('phone_one')}
            </TableCell>
            <TableCell sx={lgCell} align='left'>
              {t('email')}
            </TableCell>
            <TableCell sx={smCell} align='center'>
              {t('options')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <UserTableRow key={row.email} row={row} {...{ openEmailDrawer, openDeleteModal, openEditForm }} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default UserTable
