import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CommercialSpecsForm, {
  type commercialSpecsData,
  defaultCommercialSpec
} from 'src/components/Forms/account/CommercialSpecs'

import { Account } from 'src/components/Navbars'

import { BusinessCompanySelect } from 'src/components/Forms'

import { FilterCard } from 'src/components/Shared'

import { useProtectedAction } from 'src/hooks'

import { CommercialSpecsSchema } from 'src/schemas'

const ACCOUNT_TYPES = ['client', 'provider']

const CommercialSpecs = () => {
  const protectedAction = useProtectedAction('write', 'accounts')
  const { t } = useTranslation()
  const [accountType, setAccountType] = useState('client')
  const [business, setBusiness] = useState<number>()

  const form = useForm({
    defaultValues: defaultCommercialSpec,
    mode: 'onBlur',
    resolver: yupResolver(CommercialSpecsSchema)
  })

  const onSubmit = (data: commercialSpecsData) => {
    protectedAction(() => {console.log(data)})
  }

    // Missing endpoint. Current data is just a placeholder
    const businesses: string[] = []

  return (
    <Stack spacing={5}>
      <BusinessCompanySelect
        setBusiness={setBusiness}
        businesses={Array.isArray(businesses) ? businesses : []}
        business={business}
      />
      <Account>
        <Card>
          <CardContent>
            <Stack direction="row" gap={5}>
              {ACCOUNT_TYPES.map(type => (
                <div key={type} onClick={() => setAccountType(type)}>
                  <FilterCard value={type} contactFilter={accountType}>
                    <Card sx={{paddingLeft: 5, paddingY: 2}}>
                        <Box fontSize={15} textAlign='start' fontWeight={600} minWidth={200}>
                          {t(type)}
                        </Box>
                    </Card>
                  </FilterCard>
                </div>
              ))}
            </Stack>
          </CardContent>
          <CardContent>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack spacing={8}>
                  <CommercialSpecsForm accountType={accountType}/>
                  <Button type='submit' variant='contained' sx={{maxWidth: "200px"}}>
                    {t('save')}
                  </Button>
                </Stack>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </Account>
    </Stack>
  )
}

CommercialSpecs.acl = {
  action: 'read',
  subject: 'accounts'
}

export default CommercialSpecs

