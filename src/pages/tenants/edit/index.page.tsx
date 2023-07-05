// ** Mui imports
import { ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'

// ** Third Party imports
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// ** Custom components
import { TenantForm, defaultTenantForm, type TenantFormData } from 'src/components'
import { TenantTabs } from 'src/components/Navbars'

// ** Schemas
import { tenantSchema } from 'src/schemas'

// ** Utils
import { CNAEinfo, type cnaeInfo } from 'src/@core/utils/readExcel'

// ** Custom styles
import stackTheme from 'src/@core/styles/stackTheme'

const Edit = ({ cnae }: EditProps) => {
  const { t } = useTranslation()

  const tenantForm = useForm({
    defaultValues: defaultTenantForm,
    mode: 'onBlur',
    resolver: yupResolver(tenantSchema)
  })

  const onTenantSubmit = (data: TenantFormData) => {
    console.log(data)
  }

  return (
    <Stack spacing={6}>
      <TenantTabs />
      <Card>
        <CardContent>
          <ThemeProvider theme={stackTheme}>
            <FormProvider {...tenantForm}>
              <form onSubmit={tenantForm.handleSubmit(onTenantSubmit)}>
                <TenantForm cnae={cnae} />
                <Stack direction='row' spacing={5} mt={5}>
                  <Button type='submit' variant='contained'>
                    {t('save')}
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={() => tenantForm.reset()}>
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

export const getStaticProps = () => {
  const cnaeCodes = CNAEinfo() as cnaeInfo[]
  const cnae = cnaeCodes.filter(({ CODINTEGR }) => CODINTEGR.length > 1)

  return {
    props: { cnae }
  }
}

type EditProps = { cnae: cnaeInfo[] }

Edit.acl = {
  action: 'read',
  subject: 'tenant-system'
}

export default Edit
