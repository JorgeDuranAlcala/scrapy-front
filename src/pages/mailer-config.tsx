import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Third party imports
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Custom component
import { Mailer, MailerData } from 'src/components/Forms'

// Schema
import { MailerSchema } from 'src/schemas'

// Hooks
import UseBgColor from 'src/@core/hooks/useBgColor'
import { CircularProgress } from '@mui/material'
import useMail from 'src/hooks/useMail'
import { useEffect } from 'react'

const MailerConfig = () => {
  const mailerForm = useForm({
    defaultValues: MailerSchema.getDefault(),
    mode: 'onBlur',
    resolver: yupResolver(MailerSchema)
  })

  const { primaryFilled } = UseBgColor()

  const {
    mutateConfigureEmail: { mutate: mutateConfigureEmail, isLoading: isLoadingConfigureMutateEmail },
    configureEmailQuery: {
      data: configureEmailData,
      isSuccess: isSuccessConfigureEmail,
      isLoading: isLoadingConfigureEmail
    }
  } = useMail()

  const onSubmit = (data: MailerData) => {
    mutateConfigureEmail(data, {
      onSuccess: () => {
        mailerForm.setValue('password', '')
      }
    })
  }

  useEffect(() => {
    mailerForm.setValue('email', configureEmailData?.email || '')
    mailerForm.setValue('securityProtocol', configureEmailData?.securityProtocol || '')
    mailerForm.setValue('smtpHost', configureEmailData?.smtpHost || '')
    mailerForm.setValue('smtpPort', configureEmailData?.smtpPort || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessConfigureEmail])

  return (
    <div>
      <Box
        p={3}
        {...primaryFilled}
        justifyContent='center'
        display='flex'
        maxWidth='80px'
        borderRadius={'10px'}
        marginBottom={5}
      >
        EMAIL
      </Box>
      <Card>
        <CardContent>
          <FormProvider {...mailerForm}>
            <form onSubmit={mailerForm.handleSubmit(onSubmit)}>
              <Mailer isGettingData={isLoadingConfigureEmail} />
              <Box pt={10} display='flex' gap={3}>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={isLoadingConfigureMutateEmail || isLoadingConfigureEmail}
                  endIcon={isLoadingConfigureMutateEmail && <CircularProgress color='secondary' size={16} />}
                >
                  Guardar
                </Button>
                <Button
                  color='secondary'
                  variant='outlined'
                  disabled={isLoadingConfigureMutateEmail || isLoadingConfigureEmail}
                  onClick={() => {
                    mailerForm.reset()
                  }}
                >
                  Limpiar
                </Button>
              </Box>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}

MailerConfig.acl = {
  action: 'edit',
  subject: 'mailer'
}

export default MailerConfig
