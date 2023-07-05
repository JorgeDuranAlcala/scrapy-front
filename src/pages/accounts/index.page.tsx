import Link from 'next/link'
import { useState, useCallback } from 'react'

import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import { DataGrid, esES } from '@mui/x-data-grid'

import { AccountsAdvancedFilter, AccountsRow } from './_components'
import { accountsRowMockData } from './_const'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import { useColumns } from './_hooks'

import { type cnaeInfo, CNAEinfo } from 'src/@core/utils/readExcel'

import { CommentsModal, FilterCard, DeleteModal } from 'src/components/Shared'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

import { ModalContext } from 'src/context'

// ** Hook imports
import { useDisclosure, useAuth } from 'src/hooks'

const horizontalCards: CardStatsHorizontalProps[] = [
  {
    stats: '21,459',
    title: 'all',
    icon: 'tabler:user'
  },
  {
    stats: '19,860',
    title: 'active',
    avatarColor: 'success',
    icon: 'tabler:user-check'
  },
  {
    stats: '4,567',
    title: 'inactive',
    avatarColor: 'error',
    icon: 'tabler:user-plus'
  },
  {
    stats: '237',
    title: 'noBilling',
    avatarColor: 'warning',
    icon: 'tabler:user-exclamation'
  }
]

type PageProps = {
  cnaeOptions: cnaeInfo[]
}

const List = ({ cnaeOptions }: PageProps) => {
  const { t, i18n } = useTranslation()

  const [contactFilter, setContactFilter] = useState<undefined | string>()
  const [accountComments, setAccountComments] = useState('')
  const [accountID, setAccountID] = useState('')
  const [deleteModal, deleteHandler] = useDisclosure()
  const [commentsModal, commentsHandler] = useDisclosure()
  const { tenantUser, superAdmin } = useAuth()

  const hide = tenantUser?.userRole.specialRol === 'gestor' && !superAdmin

  const handleOpenModal = useCallback((openModal: () => void) => {
    return (id: string) => {
      setAccountID(id)
      openModal()
    }
  }, [])

  const openDeleteModal = handleOpenModal(deleteHandler.open)
  const openCommentsModal = useCallback((comments: string) => {
    setAccountComments(comments)
    return handleOpenModal(commentsHandler.open)
  }, [])

  const handleContactChange = (type: string) => {
    if (type === contactFilter) setContactFilter(undefined)
    else setContactFilter(type)
  }

  const handleDeleteAccount = () => {
    console.log("DELETE ACCOUNT:", accountID)
  }

  const cols = useColumns({ openDeleteModal, openCommentsModal })

  return (
    <Stack spacing={5}>
        <ModalContext.Provider value={[commentsModal, commentsHandler]}>
          <CommentsModal id={accountID} comments={accountComments}/>
        </ModalContext.Provider>
        <DeleteModal name='account' gender='este' handleDelete={handleDeleteAccount}
          modalOpen={deleteModal} close={deleteHandler.close}
        />
      {!hide && (
        <Grid container spacing={5}>
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
              <FilterCard
                value={title}
                contactFilter={contactFilter}
              >
                <CardStatsHorizontalWithDetails
                  sx={{width: "100%"}}
                  title={t(`account-type.${title}`)}
                  { ...props}
                />
              </FilterCard>
            </Grid>
          ))}
        </Grid>
      )}
      <Card>
        { !hide &&
        <>
          <CardHeader title={t('special-filters')}/>
          <CardContent sx={{ padding: '20px', marginTop: 5 }}>
            <Stack spacing={5} direction='row'>
              <FormControl fullWidth>
                <InputLabel id='type-label'>{t('type-select')}</InputLabel>
                <Select
                  labelId='type-label'
                  id='type-select'
                  label='Selecciona Tipo'
                  onChange={() => {
                    console.log('wow')
                  }}
                  defaultValue='all'
                >
                  <MenuItem value='all'>{t('all')}</MenuItem>
                  <MenuItem value='client'>{t('client')}</MenuItem>
                  <MenuItem value='provider'>{t('provider')}</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id='cnae-label'>{t('cnae-select')}</InputLabel>
                <Select
                  labelId='cnae-label'
                  id='cnae-select'
                  label={t('cnae-select')}
                  onChange={() => {
                    console.log('wow')
                  }}
                  defaultValue='all'
                >
                  <MenuItem value='all'>{t('all')}</MenuItem>
                  {cnaeOptions.map(({ CODINTEGR, TITULO_CNAE2009 }) => (
                    <MenuItem key={CODINTEGR} value={CODINTEGR}>{`${CODINTEGR} - ${TITULO_CNAE2009}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id='business-activity-label'>{t('business-activity-select')}</InputLabel>
                <Select
                  labelId='business-activity-label'
                  id='business-activity-select'
                  label='Selecciona actividad empresarial'
                  onChange={() => {
                    console.log('wow')
                  }}
                  defaultValue='all'
                >
                  <MenuItem value='all'>{t('all')}</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
          <Divider sx={{ margin: '0px' }} />
        </>
        }
        <CardContent sx={{ padding: '20px 0px' }}>
          <Stack
            direction={{ md: 'column', lg: 'row' }}
            justifyContent='space-between'
            alignItems='center'
            mt={5}
            spacing={5}
            paddingX='20px'
          >
            <TextField size='small' sx={{ width: 500 }} placeholder={t('search') as string} />
            <Stack direction='row' justifyContent='center' alignItems='center' spacing={5}>
              <AccountsAdvancedFilter />
              <Button startIcon={<Icon icon='tabler:download' />} variant='outlined' color='secondary'>
                {t('download')}
              </Button>
              <Link href='/accounts/new'>
                <Button variant='contained' startIcon={<Icon icon='tabler:plus' />}>
                  {t('create')}
                </Button>
              </Link>
            </Stack>
          </Stack>
        </CardContent>
        <CardContent sx={{ padding: '0px' }}>
          <Box mt={5} sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={accountsRowMockData}
              columns={cols}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5
                  }
                }
              }}
              slots={{
                row: props => <AccountsRow gridRowProps={props} />
              }}
              disableRowSelectionOnClick
              sx={{
                '& .MuiDataGrid-row:hover': { backgroundColor: 'transparent' },
                '& .MuiDataGrid-columnHeader:first-of-type': { marginLeft: '40px !important' }
              }}
              pageSizeOptions={[5]}
              getRowId={params => params.companyName}
              localeText={i18n.language === 'es' ? esES.components.MuiDataGrid.defaultProps.localeText : undefined}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  )
}

export const getServerSideProps = () => {
  const cnaeCodes = CNAEinfo() as cnaeInfo[]
  const cnaeOptions = cnaeCodes.filter(({ CODINTEGR }) => CODINTEGR.length > 1)

  return {
    props: { cnaeOptions }
  }
}

List.acl = {
  action: 'read',
  subject: 'accounts'
}

export default List
