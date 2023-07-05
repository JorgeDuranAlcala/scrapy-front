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
import {
  TenantForm,
  defaultTenantForm,
  type TenantFormData,
  BankForm,
  defaultBankForm,
  type BankFormData
} from 'src/components/Forms'

import { tenantSchema, BankSchema } from 'src/schemas'

// ** Utils
import { CNAEinfo, type cnaeInfo } from 'src/@core/utils/readExcel'

// ** Custom styles
import stackTheme from 'src/@core/styles/stackTheme'

const mergedSchema = tenantSchema.concat(BankSchema)

type TenantAndBank = TenantFormData & BankFormData

const defaultForm: TenantAndBank = { ...defaultTenantForm, ...defaultBankForm }

const New = ({ cnae }: Props) => {
  const { t } = useTranslation()

  const newTenantForm = useForm({
    defaultValues: defaultForm,
    mode: 'onBlur',
    resolver: yupResolver(mergedSchema)
  })

  const onSubmit = (data: TenantAndBank) => {
    console.log(data)
  }

  return (
    <FormProvider {...newTenantForm}>
      <form onSubmit={newTenantForm.handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <ThemeProvider theme={stackTheme}>
            <Card>
              <CardContent>
                <TenantForm cnae={cnae} />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Stack>
                  <BankForm />
                </Stack>
              </CardContent>
            </Card>
          </ThemeProvider>
          <Stack direction='row' spacing={5} mt={5}>
            <Button size='large' type='submit' variant='contained'>
              {t('save')}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={() => newTenantForm.reset()}>
              {t('reset')}
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  )
}

export const getStaticProps = () => {
  const cnaeCodes = CNAEinfo() as cnaeInfo[]
  const cnae = cnaeCodes.filter(({ CODINTEGR }) => CODINTEGR.length > 1)

  return {
    props: { cnae }
  }
}

type Props = { cnae: cnaeInfo[] }

New.acl = {
  action: 'read',
  subject: 'tenant-system'
}


export default New
