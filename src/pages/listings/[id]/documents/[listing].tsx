import { useState } from 'react'

import { useRouter } from 'next/router'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

// Layout
import ListingLayout from 'src/layouts/ListingLayout'

import { FileUploader, FileProp } from 'src/components/Shared'
import { DocumentsTable } from 'src/components/Tables'

const Test = () => {
  const [files, setFiles] = useState<FileProp[]>([])
  const [search, setSearch] = useState('')
  const {
    query: { listing }
  } = useRouter()

  return (
    <ListingLayout>
      <Card>
        <CardContent>
          <FileUploader {...{ files, setFiles, documentSaveRoute: listing as string }} />
        </CardContent>
        <CardContent sx={{ paddingBottom: '5px' }}>
          <TextField
            placeholder={'buscar'}
            size='small'
            sx={{ width: 300 }}
            value={search}
            onChange={event => {
              setSearch(event.target.value)
            }}
          />
        </CardContent>
        <DocumentsTable search={search} filter={'something'} />
      </Card>
    </ListingLayout>
  )
}

Test.acl = {
  action: 'see',
  subject: 'user-pages'
}

export default Test
