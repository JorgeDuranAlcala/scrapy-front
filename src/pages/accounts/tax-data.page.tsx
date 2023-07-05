import { useEffect, useState } from 'react'

import { ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'

// ** Core components
import { Account as AccountTabs } from 'src/components/Navbars'
import {
  BusinessCompanySelect,
  AccountTypeSelect,
  ParticularForm,
  CompanyForm,
  clientSchema,
  companySchema,
  Representative,
  defaultParticularForm,
  defaultCompanyForm,
  type CompanyFormData,
  ParticularFormData
} from 'src/components/Forms'

// ** Custom styles
import stackTheme from 'src/@core/styles/stackTheme'

// ** Custom Utils
import { CNAEinfo, type cnaeInfo } from 'src/@core/utils/readExcel'

// ** Hooks
import { useProtectedAction } from 'src/hooks'

const TaxData = ({ cnae }: TaxDataProps) => {
  const { t } = useTranslation()
  const protectedAction = useProtectedAction('write', 'accounts')

  const companyForm = useForm({
    defaultValues: defaultCompanyForm,
    mode: 'onBlur',
    resolver: yupResolver(companySchema)
  })

  const particularForm = useForm({
    defaultValues: defaultParticularForm,
    mode: 'onBlur',
    resolver: yupResolver(clientSchema)
  })

  const [businessInfo, setBusinessInfo] = useState<number>()

  const clientType = companyForm.watch('clientType')
  const isParticular = clientType === 'particular-client'
  const represents = companyForm.watch('represents')

  useEffect(() => {
    particularForm.setValue('represents', represents)
  }, [represents])

  // Missing endpoint. Current data is just a placeholder
  const businesses = ['test', 'test1', 'test2']

  const businessMenu = businesses

  const companySubmit = (data: CompanyFormData) => {
    protectedAction(() => console.log(data), 'submitted-succesfully')
  }

  const particularSubmit = (data: ParticularFormData) => {
    protectedAction(() => console.log(data), 'submitted-succesfully')
  }

  const SubmitButton = () => (
    <Button sx={{ marginTop: 10 }} variant='contained' type='submit'>
      {t('save')}
    </Button>
  )

  return (
    <Stack spacing={5}>
      <BusinessCompanySelect
        setBusiness={setBusinessInfo}
        businesses={Array.isArray(businessMenu) ? businessMenu : []}
        org={'company'}
        business={businessInfo}
      />
      <AccountTabs>
        <Card>
          <CardContent>
            <ThemeProvider theme={stackTheme}>
              <FormProvider {...companyForm}>
                <Stack mb={5}
                  justifyContent={{sm:"center", md: "space-between"}}
                  alignItems={{sm:"center", md: "start"}}
                >
                  <AccountTypeSelect />
                  <Representative/>
                </Stack>
                { !isParticular &&
                  <form onSubmit={companyForm.handleSubmit(companySubmit)}>
                      <CompanyForm cnae={cnae} />
                      <SubmitButton />
                  </form>
                }
              </FormProvider>
              <FormProvider {...particularForm}>
                { isParticular &&
                  <form onSubmit={particularForm.handleSubmit(particularSubmit)}>
                      <ParticularForm />
                      <SubmitButton />
                  </form>
                }
              </FormProvider>
            </ThemeProvider>
          </CardContent>
        </Card>
      </AccountTabs>
    </Stack>
  )
}

export const getServerSideProps = () => {
  const cnaeCodes = CNAEinfo() as cnaeInfo[]
  const cnae = cnaeCodes.filter(({ CODINTEGR }) => CODINTEGR.length > 1)

  return {
    props: { cnae }
  }
}

type TaxDataProps = {
  cnae: cnaeInfo[]
}

TaxData.acl = {
  action: 'read',
  subject: 'accounts'
}

export default TaxData
