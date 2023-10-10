import { Card } from '@mui/material'
import { useRouter } from 'next/router'
import ListingLayout from 'src/layouts/ListingLayout'
import CardTitle from '@mui/material/CardHeader'
import ListingSpamTable from 'src/components/Tables/spam/ListingSpamTable'
import useSpam from 'src/hooks/useSpam'

const Spam = () => {
  const {
    query: { id: idPage }
  } = useRouter()

  const {
    mutateDeleteSpamQuery: { isLoading: isLoadingDelete, mutate: mutateDeleteSpam },
    spamQuery: { data: dataSpam, isLoading: isLoadingSpam }
  } = useSpam({ idPage: idPage as string | undefined })

  const generateRows = (data: string[]) => {
    if (data?.length === 0) return []
    return data?.map(item => ({
      id: item,
      email: item
    }))
  }

  const handleDelete = (id: string) => mutateDeleteSpam(id as string)

  return (
    <ListingLayout>
      <Card>
        <CardTitle title='spam' sx={{ textTransform: 'uppercase' }} />
        <ListingSpamTable
          isLoading={isLoadingSpam || isLoadingDelete}
          handleDelete={handleDelete}
          rows={generateRows(dataSpam || [])}
        />
      </Card>
    </ListingLayout>
  )
}

Spam.acl = {
  action: 'see',
  subject: 'spam'
}

export default Spam
