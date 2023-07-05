import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@mui/material'
import { useTranslation } from 'react-i18next'

// ** Third Party imports
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom components
import { BankForm, defaultBankForm, type BankFormData } from 'src/components'
import { TenantTabs } from 'src/components/Navbars'

// ** Schemas
import { BankSchema } from 'src/schemas'

// ** Custom styles
import stackTheme from 'src/@core/styles/stackTheme'

const EditBank = () => {
  const { t } = useTranslation()

  const bankForm = useForm({
    defaultValues: defaultBankForm,
    mode: 'onBlur',
    resolver: yupResolver(BankSchema)
  })

  const onBankSubmit = (data: BankFormData) => {
    console.log(data)
  }

  return (
    <Stack spacing={5}>
      <TenantTabs />
      <Card>
        <CardContent>
          <ThemeProvider theme={stackTheme}>
            <FormProvider {...bankForm}>
              <form onSubmit={bankForm.handleSubmit(onBankSubmit)}>
                <Stack>
                  <BankForm />
                </Stack>
                <Stack direction='row' spacing={5} mt={5}>
                  <Button type='submit' variant='contained'>
                    {t('save')}
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={() => bankForm.reset()}>
                    {t('reset')}
                  </Button>
                </Stack>
              </form>
            </FormProvider>
          </ThemeProvider>
        </CardContent>
      </Card>
    </Stack>
  )
}

EditBank.acl = {
  action: 'read',
  subject: 'tenant-system'
}

export default EditBank
