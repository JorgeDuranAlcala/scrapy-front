import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

import { useTranslation } from 'react-i18next'

import { FileUploader, FileProp } from 'src/components/Shared'
import { DocumentsTable } from 'src/components/Tables'

const Test = () => {
  const { t } = useTranslation()
  const [files, setFiles] = useState<FileProp[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('client')

  return (
    <>
      <Card>
        <CardContent>
          <FileUploader {...{ files, setFiles, documentSaveRoute: filter }} />
        </CardContent>
        <CardContent sx={{ paddingBottom: '5px' }}>
          <TextField
            placeholder={t('search') as string}
            size='small'
            sx={{ width: 300 }}
            value={search}
            onChange={event => {
              setSearch(event.target.value)
            }}
          />
        </CardContent>
        <DocumentsTable search={search} filter={filter} />
      </Card>
    </>
  )
}

Test.acl = {
  subject: 'accounts',
  action: 'read'
}

export default Test
