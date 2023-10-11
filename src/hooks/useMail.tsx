import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { MailerData } from 'src/components'
import getConfigureEmail from 'src/services/notifications/getConfigureEmail'
import putConfigureEmail from 'src/services/notifications/putConfigureEmail'

const useMail = () => {
  const mutateConfigureEmail = useMutation({
    mutationKey: ['configure-mail'],
    mutationFn: async (data: MailerData) => {
      return await putConfigureEmail(data)
    },
    onSuccess: () => {
      toast.success('Datos de configuración de Email actualizados')
    },
    onError: () => {
      toast.error('Algo fue mal al actualizar la configuración de Email')
    }
  })

  const configureEmailQuery = useQuery({
    queryKey: ['configure-mail'],
    queryFn: async () => {
      return await getConfigureEmail()
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

    retry: 0
  })

  return {
    mutateConfigureEmail,
    configureEmailQuery
  }
}

export default useMail
