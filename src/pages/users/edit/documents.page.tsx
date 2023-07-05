import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import { useTranslation } from 'react-i18next'

import CardStatsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import { FileUploader, FileProp, FilterCard } from 'src/components/Shared'
import { DocumentsTable } from 'src/components/Tables'
import { UserSettingsTabs } from 'src/components/Navbars'

const horizontalCards: CardStatsHorizontalProps[] = [
  {
    title: 'private',
    icon: 'tabler:user'
  },
  {
    title: 'shared',
    avatarColor: 'success',
    icon: 'tabler:user-check'
  }
]

const DocumentsPage = () => {
  const { t } = useTranslation()
  const [files, setFiles] = useState<FileProp[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('private')

  const handleContactChange = (type: string) => {
    setFilter(type)
  }

  return (
    <>
      <UserSettingsTabs />
      <Grid container spacing={5} mb={5} mt="1px">
        {horizontalCards.map(({ title, ...props }) => (
          <Grid
            item
            lg={3}
            xs={6}
            onClick={() => {
              handleContactChange(title)
            }}
            key={title}
          >
            <FilterCard value={title} contactFilter={filter}>
              <CardStatsHorizontal title={t(`document-type.${title}`)} sx={{ width: '100%' }} {...props} />
            </FilterCard>
          </Grid>
        ))}
      </Grid>
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

DocumentsPage.acl = {
  action: 'update',
  subject: 'personal-account'
}

export default DocumentsPage
