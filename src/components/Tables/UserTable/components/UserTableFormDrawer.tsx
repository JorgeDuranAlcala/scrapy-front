import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
// import { useDispatch, useSelector } from 'react-redux'

//* Icon imports
import { useFormContext } from 'react-hook-form'

import Icon from 'src/@core/components/icon'

// * Custom components
import { UserForm, defaultUserForm } from 'src/components/Forms'

// * Schemas

// * Redux slices
// import { componentOpen, selectOpened } from 'src/redux/slices'
// import { useRouter } from 'next/router'
import { useMemo } from 'react'

const UserFormDrawer = () => {
  const { t } = useTranslation()
  const userForm = useFormContext()
  // const dispatch = useDispatch()
  // const { close } = componentOpen.actions
  // const opened = useSelector(selectOpened)


  const handleFormClose = () => {
    userForm.reset(defaultUserForm)
  }

  return (
    <Drawer anchor='right' open={false} onClose={handleFormClose}>
      <form
        onSubmit={userForm.handleSubmit(data => {
          console.log(data)
        })}
      >
        <Stack pt={5} px={5} direction='row' justifyContent='space-between' alignItems='center'>
          <Box typography={'h6'}>{t('user')}</Box>
          <IconButton onClick={handleFormClose}>
            <Icon icon='tabler:x' width={24} />
          </IconButton>
        </Stack>
        <UserForm />
        <Stack direction='row' justifyContent='space-between' px={5} pb={10}>
          <Button type='submit' variant='contained'>
            {t('save')}
          </Button>
          <Button color='secondary' variant='outlined' onClick={handleFormClose}>
            {t('cancel')}
          </Button>
        </Stack>
      </form>
    </Drawer>
  )
}

export default UserFormDrawer
