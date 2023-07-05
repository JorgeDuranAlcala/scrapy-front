import { useState, ChangeEvent } from 'react'
import Box from "@mui/material/Box"
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from "@mui/material/Dialog"
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { ThemeProvider } from '@mui/material'
import { useTranslation } from 'react-i18next'

// ** Third Party imports
import { useForm, FormProvider } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Context
import { ModalContext } from 'src/context'

// ** Custom components
import { RoleForm, defaultRoleForm } from "src/components/Forms"
import { RolesTable } from 'src/components/Tables'
import { UsersManagementTabs } from 'src/components/Navbars'

// ** Custom hooks
import { useDisclosure } from 'src/hooks'

// ** Custom styles
import stackTheme from 'src/@core/styles/stackTheme'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Schemas
import { roleSchema } from 'src/schemas'

// ** Types
import { Role, allPermissions } from 'src/types'

const MOCK_ROLE_DATA: Role[] = []

for (let i = 0; i < 22; i++) {
  const mockRole = {
    role: 'Admin' + i,
    permissions: allPermissions(false)
  }

  if(Math.random() >= 0.5) mockRole.permissions[0].write = true
  else mockRole.permissions[0].read= true

  MOCK_ROLE_DATA.push(mockRole)
}

const RoleTable = () => {
  const { t } = useTranslation()
  const modalState = useDisclosure()
  const [opened, {open, close}] = modalState

  const rolesForm = useForm({
    defaultValues: defaultRoleForm,
    mode: 'onBlur',
    resolver: yupResolver(roleSchema)
  })

  const [search, setSearch] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClose = () =>{
    rolesForm.reset(defaultRoleForm)
    close()
  }

  const onSubmit = (data: typeof defaultRoleForm) => {
    console.log(data)
    toast.success(t('new-role-created'))
    rolesForm.reset(defaultRoleForm)
    close()
  }

  return (
    <ModalContext.Provider value={modalState}>
      <Stack spacing={5}>
        <Dialog
          open={opened}
          onClose={handleClose}
          aria-labelledby="role-form"
          aria-describedby="role-form-body"
          fullWidth
          scroll="body"
        >
          <Box padding={5}>
            <FormProvider {...rolesForm}>
              <form
                autoComplete='off'
                onSubmit={rolesForm.handleSubmit(onSubmit)}
              >
                <RoleForm />
              </form>
            </FormProvider>
          </Box>
        </Dialog>
        <UsersManagementTabs/>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <ThemeProvider theme={stackTheme}>
                <Stack justifyContent='space-between' alignItems={"center"}>
                  <TextField
                    sx={{minWidth: 300}}
                    size="small"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder={t('search') as string}/>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={open}
                  >
                    {t('create_context', {context: 'role'})}
                  </Button>
                </Stack>
              </ThemeProvider>
                <FormProvider {...rolesForm}>
                  <RolesTable rows={MOCK_ROLE_DATA}/>
                </FormProvider>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </ModalContext.Provider>
  )
}

RoleTable.acl = {
  action: 'read',
  subject: 'users'
}


export default RoleTable
