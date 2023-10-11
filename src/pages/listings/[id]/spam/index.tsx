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
    spamQuery: { data: dataSpam, isLoading: isLoadingSpam }
  } = useSpam({ idPage: idPage as string | undefined })

  const generateRows = (data: string[]) => {
    if (data?.length === 0) return []
    return data?.map(item => ({
      id: item,
      email: item
    }))
  }

  return (
    <ListingLayout>
      <Card>
        <CardTitle title='spam' sx={{ textTransform: 'uppercase' }} />
        <ListingSpamTable isLoading={isLoadingSpam} rows={generateRows(dataSpam || [])} idPage={idPage} />
      </Card>
    </ListingLayout>
  )
}

Spam.acl = {
  action: 'see',
  subject: 'spam'
}

export default Spam
