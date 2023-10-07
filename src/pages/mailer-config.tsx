import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Third party imports
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Custom component
import { FormButtons, Mailer, MailerData } from 'src/components/Forms'

// Schema
import { MailerSchema } from 'src/schemas'

// Hooks
import UseBgColor from 'src/@core/hooks/useBgColor'
import { useMutation } from '@tanstack/react-query'
import putConfigureEmail from 'src/services/notifications/putConfigureEmail'
import { toast } from 'react-hot-toast'
import { CircularProgress } from '@mui/material'

const MailerConfig = () => {
  const mailerForm = useForm({
    defaultValues: MailerSchema.getDefault(),
    mode: 'onBlur',
    resolver: yupResolver(MailerSchema)
  })

  const { primaryFilled } = UseBgColor()

  const { mutate: mutateConfigureEmail, isLoading: isLoadingConfigureEmail } = useMutation({
    mutationKey: ['configure-mail'],
    mutationFn: async (data: MailerData) => {
      return await putConfigureEmail(data)
    },
    onSuccess: () => {
      toast.success('Datos de configuración de Email actualizados')
      mailerForm.reset()
    },
    onError: () => {
      toast.error('Algo fue mal al actualizar la configuración de Email')
    }
  })

  const onSubmit = (data: MailerData) => {
    mutateConfigureEmail(data)
  }

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
              <Mailer />
              <Box pt={10} display='flex' gap={3}>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={isLoadingConfigureEmail}
                  endIcon={isLoadingConfigureEmail && <CircularProgress color='secondary' size={16} />}
                >
                  Guardar
                </Button>
                <Button
                  color='secondary'
                  variant='outlined'
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
