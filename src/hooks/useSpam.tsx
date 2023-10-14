import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { deleteSpam, getSpam } from 'src/services/spam'

type Props = {
  idPage?: string
}

const useSpam = ({ idPage }: Props) => {
  const { invalidateQueries } = useQueryClient()
  const spamQuery = useQuery({
    queryKey: ['spam', idPage],
    queryFn: async () => await getSpam(),
    enabled: !!idPage,
    refetchOnWindowFocus: false
  })

  const mutateDeleteSpamQuery = useMutation({
    mutationKey: ['delete'],
    mutationFn: async (id: string) => {
      return await deleteSpam(id)
    },
    onSuccess: () => {
      toast.success('Email Eliminado')
      invalidateQueries(['spam'])
    },
    onError: () => {
      toast.error('Error al eliminar el Email')
    }
  })

  return {
    spamQuery,
    mutateDeleteSpamQuery
  }
}

export default useSpam
