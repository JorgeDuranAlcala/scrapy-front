import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import { useTranslation } from 'react-i18next'

import CardStatsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import { FileUploader, FileProp, FilterCard } from 'src/components/Shared'
import { DocumentsTable } from 'src/components/Tables'
import { Account } from 'src/components/Navbars'
import { BusinessCompanySelect } from 'src/components/Forms'

const horizontalCards: CardStatsHorizontalProps[] = [
  {
    title: 'client',
    icon: 'tabler:user'
  },
  {
    title: 'provider',
    avatarColor: 'success',
    icon: 'tabler:user-check'
  }
]

const Test = () => {
  const { t } = useTranslation()
  const [files, setFiles] = useState<FileProp[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('client')

  const [business, setBusiness] = useState<number>()

  const handleFilterChange = (type: string) => {
    setFilter(type)
  }

  // Missing endpoint. Current data is just a placeholder
  const businesses: string[] = []

  return (
    <>
      <Box mb={5}>
        <BusinessCompanySelect
          setBusiness={setBusiness}
          businesses={Array.isArray(businesses) ? businesses : []}
          business={business}
        />
      </Box>
      <Account>
        <>
          <Grid container spacing={5} mb={5}>
            {horizontalCards.map(({ title, ...props }) => (
              <Grid
                item
                lg={3}
                xs={6}
                onClick={() => {
                  handleFilterChange(title)
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
            <DocumentsTable search={search} filter={filter}/>
          </Card>
        </>
      </Account>
    </>
  )
}

Test.acl = {
  subject: 'accounts',
  action: 'read'
}

export default Test
