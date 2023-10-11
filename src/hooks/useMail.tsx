import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { MailerData } from 'src/components'
import getConfigureEmail from 'src/services/notifications/getConfigureEmail'
import putConfigureEmail from 'src/services/notifications/putConfigureEmail'

const useMail = () => {
  const queryCache = useQueryClient()

  const configureEmailQuery = useQuery({
    queryKey: ['configure-mail-data'],
    queryFn: async () => {
      return await getConfigureEmail()
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const mutateConfigureEmail = useMutation({
    mutationKey: ['configure-mail'],
    mutationFn: async (data: MailerData) => {
      return await putConfigureEmail(data)
    },
    onSuccess: () => {
      toast.success('Datos de configuración de Email actualizados')
      queryCache.invalidateQueries({
        queryKey: ['configure-mail-data']
      })
    },
    onError: () => {
      toast.error('Algo fue mal al actualizar la configuración de Email')
    }
  })

  return {
    mutateConfigureEmail,
    configureEmailQuery
  }
}

export default useMail
