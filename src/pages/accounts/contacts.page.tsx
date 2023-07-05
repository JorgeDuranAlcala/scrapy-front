import { useState, useContext } from 'react'

import { Icon } from '@iconify/react'
import { ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

// ** Custom style
import StackTheme from 'src/@core/styles/stackTheme'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Custom components
import { Account } from 'src/components/Navbars'
import {
  BusinessCompanySelect,
  ContactForm,
  defaultContactForm,
  type ContactsFormData,
} from 'src/components'

import { ContactSchema } from 'src/schemas'

const extendedSchema = yup
  .object()
  .shape({
    comments: yup.string()
  })
  .concat(ContactSchema)

type extendedFormData = {
  comments?: string
} & ContactsFormData

const extendedContactForm: extendedFormData = { ...defaultContactForm }

const Contacts = () => {
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)
  const canWrite = ability?.can('read', 'accounts')
  const [business, setBusiness] = useState<number>()

  // TODO: When there is more than one address display a select
  // or autocomplete field to allow user selection

  // Missing endpoint. Current data is just a placeholder
  const businesses: string[] = []

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: extendedContactForm,
    mode: 'onBlur',
    resolver: yupResolver(extendedSchema)
  })

  const onSubmit = (data: extendedFormData) => {
    console.log(data)
  }

  return (
    <Stack spacing={5}>
      <BusinessCompanySelect
        setBusiness={setBusiness}
        businesses={Array.isArray(businesses) ? businesses : []}
        business={business}
      />
      <Account>
        <Stack spacing={5} width={'100%'}>
          <Card>
            <CardContent>
              <ThemeProvider theme={StackTheme}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <Button disabled={!canWrite} type='submit' variant='contained' sx={{ marginBottom: 10 }}>
                    {t('create_context', { context: t('contact') })}
                  </Button>
                  <Stack direction={'column'}>
                    <ContactForm control={control} errors={errors} />
                    <FormControl fullWidth>
                      <Controller
                        name='comments'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            label='Comentarios'
                            multiline
                            rows={5}
                            InputProps={{
                              sx: { alignItems: 'start' },
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <Icon width={20} icon='tabler:message' />
                                </InputAdornment>
                              )
                            }}
                          />
                        )}
                      />
                    </FormControl>
                    <Button color='error' variant='outlined'
                      sx={{maxWidth:"120px"}}
                    >
                      {t('delete')}
                    </Button>
                  </Stack>
                </form>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Stack>
      </Account>
    </Stack>
  )
}

Contacts.acl = {
  action: 'read',
  subject: 'accounts'
}

export default Contacts
