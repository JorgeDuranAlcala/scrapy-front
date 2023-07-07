import { useState, useCallback, memo } from 'react'

import Box from '@mui/material/Box'
import { DataGrid, esES } from '@mui/x-data-grid'

import ListingRow from './components/ListingTableRow'
import useColumns from './hooks/useColumns'

import { CommentsModal, EmailDrawer } from 'src/components/Shared'

import { ModalContext } from 'src/context'

// ** Hook imports
import { useDisclosure } from 'src/hooks'

type ListingRowProps = {
  // filters: {
  //   city: string
  // }
}

const ROWS= [
  {
    id: 1,
    email: "test@gmail.com",
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'contact',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: 12345,
    adOwner: 'test',
    userAd: 'test',
    link: '#',
    count:2
  },
  {
    id: 2,
    email: "test2@gmail.com",
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'contact',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: 12345,
    adOwner: 'test',
    userAd: 'test',
    link: '#',
    count:3
  }
]

const ListingTable = (/*{ filters }: ListingRowProps*/) => {
  const [accountComments, setAccountComments] = useState('')
  const [adEmail, setAdEmail] = useState('')
  const [commentsModal, commentsHandler] = useDisclosure()
  const [emailModal, emailHandler] = useDisclosure()

  const openEmailModal = useCallback((email: string) => {
      setAdEmail(email)
      emailHandler.open()
  }, [])

  const cols = useColumns({openEmailModal})

  return (
    <Box mt={5} sx={{ height: 400, width: '100%' }}>
      <EmailDrawer open={emailModal} toggle={emailHandler.close}
        recipients={[adEmail]}
      />
      <DataGrid
        rows={ROWS}
        columns={cols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        slots={{
          row: props => <ListingRow gridRowProps={props} />
        }}
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-row:hover': { backgroundColor: 'transparent' },
          '& .MuiDataGrid-columnHeader:first-of-type': { marginLeft: '40px !important' }
        }}
        pageSizeOptions={[5]}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  )
}

export default memo(ListingTable)
