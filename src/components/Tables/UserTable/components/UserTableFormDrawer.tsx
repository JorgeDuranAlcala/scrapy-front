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
import { UserForm } from 'src/components/Forms'

type UserFormDrawer = {
  opened: boolean
  close: () => void
}

const UserFormDrawer = ({opened, close}: UserFormDrawer) => {
  const { t } = useTranslation()
  const userForm = useFormContext()

  return (
    <Drawer anchor='right' open={opened} onClose={close}>
      <form
        onSubmit={userForm.handleSubmit(data => {
          console.log(data)
        })}
      >
        <Stack pt={5} px={5} direction='row' justifyContent='space-between' alignItems='center'>
          <Box typography={'h6'}>{t('user')}</Box>
          <IconButton onClick={close}>
            <Icon icon='tabler:x' width={24} />
          </IconButton>
        </Stack>
        <UserForm />
        <Stack direction='row' justifyContent='space-between' px={5} pb={10}>
          <Button type='submit' variant='contained'>
            {t('save')}
          </Button>
          <Button color='secondary' variant='outlined' onClick={close}>
            {t('cancel')}
          </Button>
        </Stack>
      </form>
    </Drawer>
  )
}

export default UserFormDrawer
