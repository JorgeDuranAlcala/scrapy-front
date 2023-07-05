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

import AccountsRow from './components/ListingTableRow'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import useColumns from './hooks/useColumns'

import { type cnaeInfo, CNAEinfo } from 'src/@core/utils/readExcel'

import { CommentsModal, DeleteModal } from 'src/components/Shared'
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

const ListingTable = ({ cnaeOptions }: PageProps) => {
  const { t, i18n } = useTranslation()

  const [contactFilter, setContactFilter] = useState<undefined | string>()
  const [accountComments, setAccountComments] = useState('')
  const [accountID, setAccountID] = useState('')
  const [deleteModal, deleteHandler] = useDisclosure()
  const [commentsModal, commentsHandler] = useDisclosure()

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


  const cols = useColumns({ openDeleteModal, openCommentsModal })

  return ( <></>
    // <Stack spacing={5}>
    //   <Card>
    //     <>
    //       <CardHeader title={t('special-filters')}/>
    //       <Divider sx={{ margin: '0px' }} />
    //     </>
    //     <CardContent sx={{ padding: '20px 0px' }}>
    //       <Stack
    //         direction={{ md: 'column', lg: 'row' }}
    //         justifyContent='space-between'
    //         alignItems='center'
    //         mt={5}
    //         spacing={5}
    //         paddingX='20px'
    //       >
    //         <TextField size='small' sx={{ width: 500 }} placeholder={t('search') as string} />
    //         <Stack direction='row' justifyContent='center' alignItems='center' spacing={5}>
    //           <AccountsAdvancedFilter />
    //           <Button startIcon={<Icon icon='tabler:download' />} variant='outlined' color='secondary'>
    //             {t('download')}
    //           </Button>
    //           <Link href='/accounts/new'>
    //             <Button variant='contained' startIcon={<Icon icon='tabler:plus' />}>
    //               {t('create')}
    //             </Button>
    //           </Link>
    //         </Stack>
    //       </Stack>
    //     </CardContent>
    //     <CardContent sx={{ padding: '0px' }}>
    //       <Box mt={5} sx={{ height: 400, width: '100%' }}>
    //         <DataGrid
    //           rows={accountsRowMockData}
    //           columns={cols}
    //           initialState={{
    //             pagination: {
    //               paginationModel: {
    //                 pageSize: 5
    //               }
    //             }
    //           }}
    //           slots={{
    //             row: props => <AccountsRow gridRowProps={props} />
    //           }}
    //           disableRowSelectionOnClick
    //           sx={{
    //             '& .MuiDataGrid-row:hover': { backgroundColor: 'transparent' },
    //             '& .MuiDataGrid-columnHeader:first-of-type': { marginLeft: '40px !important' }
    //           }}
    //           pageSizeOptions={[5]}
    //           getRowId={params => params.companyName}
    //           localeText={i18n.language === 'es' ? esES.components.MuiDataGrid.defaultProps.localeText : undefined}
    //         />
    //       </Box>
    //     </CardContent>
    //   </Card>
    // </Stack>
  )
}

export default ListingTable
