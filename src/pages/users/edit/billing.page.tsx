import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@mui/material'
import { useTranslation } from 'react-i18next'

// * Third party imports
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// * Custom Components
import {
  ControlledTextField,
  FormButtons,
  BankForm,
  AddressForm,
  defaultBankForm,
  type BankFormData
} from 'src/components/Forms'
import { BillingTable } from 'src/components/Tables'
import { UserSettingsTabs } from "src/components/Navbars"


// * Custom styles
import stackTheme from 'src/@core/styles/stackTheme'

// * Schemas
import { BankSchema, adminBillingSchema } from 'src/schemas'

const defaultAdminBilling = {
  fiscalName: '',
  NIF: '',
  address: '',
  country: '',
  province: '',
  city: '',
  postalCode: '',
  phone: '',
  email: ''
}

const AdminBilling = () => {
  const { t } = useTranslation()
  const adminBillingForm = useForm({
    defaultValues: defaultAdminBilling,
    mode: 'onBlur',
    resolver: yupResolver(adminBillingSchema)
  })

  const onAdminSubmit = (data: typeof defaultAdminBilling) => {
    console.log(data)
  }

  const bankForm = useForm({
    defaultValues: defaultBankForm,
    mode: 'onBlur',
    resolver: yupResolver(BankSchema)
  })

  const onBankSubmit = (data: BankFormData) => {
    console.log(data)
  }

  return (
    <Stack spacing={3}>
      <UserSettingsTabs/>
      <Card>
        <CardHeader title={t('billing-data')} />
        <CardContent>
          <FormProvider {...adminBillingForm}>
            <form onSubmit={adminBillingForm.handleSubmit(onAdminSubmit)}>
              <Stack spacing={5}>
                <ThemeProvider theme={stackTheme}>
                  <Stack>
                    <ControlledTextField name='fiscalName' label='fiscal-name' required />
                    <ControlledTextField name='NIF' label='NIF' required/>
                  </Stack>
                  <AddressForm />
                  <Stack>
                    <ControlledTextField name='phone' label='phone_one' required />
                    <ControlledTextField name='email' label='email' required />
                  </Stack>
                </ThemeProvider>
                <FormButtons />
              </Stack>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={t('banking-data')} />
        <CardContent>
          <ThemeProvider theme={stackTheme}>
            <FormProvider {...bankForm}>
              <form onSubmit={bankForm.handleSubmit(onBankSubmit)}>
                <Stack marginBottom={5}>
                  <BankForm />
                </Stack>
                <FormButtons />
              </form>
            </FormProvider>
          </ThemeProvider>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={t('bill-history')}/>
          <CardContent>
            <BillingTable rows={[]}/>
          </CardContent>
      </Card>
    </Stack>
  )
}

AdminBilling.acl = {
  action: 'update',
  subject: 'tenant-settings'
}

export default AdminBilling
