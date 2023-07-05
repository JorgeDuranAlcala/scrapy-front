import { useState } from 'react'

import { ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

// ** Third party imports
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** Core components
import { Account as AccountTabs } from 'src/components/Navbars'
import {
  BusinessCompanySelect,
  OtherAddrData,
  OtherAdressesForm,
  defaultOtherAddrForm,
} from 'src/components'

// ** Schemas
import { OtherAddrSchema } from 'src/schemas'

import stackTheme from 'src/@core/styles/stackTheme'

const OtherAdresses = () => {
  const { t } = useTranslation()
  const [submit, setSubmit] = useState('')

  const form = useForm({
    defaultValues: defaultOtherAddrForm,
    mode: 'onBlur',
    resolver: yupResolver(OtherAddrSchema)
  })
  const organization = 'company'
  const [business, setBusiness] = useState<number>()

  // TODO: When there is more than one address display a select
  // or autocomplete field to allow user selection

  // Missing endpoint. Current data is just a placeholder
  const businesses = {
    company: ['apple', 'google', 'meta'],
    client: ['joe', 'chris', 'jason']
  }

  const businessMenu = organization === 'company' && businesses[organization]

  const onSubmit = (data: OtherAddrData) => {
    console.log(submit)
    console.log(data)
  }

  return (
    <Stack spacing={5} width={'100%'}>
      <BusinessCompanySelect
        setBusiness={setBusiness}
        businesses={Array.isArray(businessMenu) ? businessMenu : []}
        business={business}
      />
      <AccountTabs>
        <Card>
          <CardContent>
            <ThemeProvider theme={stackTheme}>
              <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack mb={5}>
                  <Button variant='contained'>{t('create_context', { context: t('address') })}</Button>
                </Stack>
                <OtherAdressesForm />
                <div style={{marginTop: "20px"}}>
                  <Button color='error' variant='outlined'>
                    {t('delete')}
                  </Button>
                </div>
              </form>
              </FormProvider>
            </ThemeProvider>
          </CardContent>
        </Card>
      </AccountTabs>
    </Stack>
  )
}

OtherAdresses.acl = {
  action: 'read',
  subject: 'accounts'
}

export default OtherAdresses
