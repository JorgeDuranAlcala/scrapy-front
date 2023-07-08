import { useState, useCallback, memo } from 'react'

import Box from '@mui/material/Box'
import { DataGrid, esES, GridValidRowModel } from '@mui/x-data-grid'

import ListingRow from './components/ListingTableRow'
import useColumns from './ColumnDefs/listingColumns'

import { CommentsModal, EmailDrawer } from 'src/components/Shared'

import { ModalContext } from 'src/context'

// ** Hook imports
import { useDisclosure } from 'src/hooks'

type Props = {
  columnDefinition: typeof useColumns
  rows: GridValidRowModel[]
}

const ListingTable = ({columnDefinition, rows =[]}: Props) => {
  const [comments, setComments] = useState('')
  const [id, setID] = useState('')
  const [adEmail, setAdEmail] = useState('')
  const [commentsModal, commentsHandler] = useDisclosure()
  const [emailModal, emailHandler] = useDisclosure()

  const openEmailModal = (email: string) => {
      setAdEmail(email)
      emailHandler.open()
  }

  const openCommentsModal = (id: string, comment: string) => {
    setID(id)
    setComments(comment)
    commentsHandler.open()
  }

  const cols = useCallback(() => columnDefinition({openEmailModal, openCommentsModal}), [])

  return (
    <Box mt={5} sx={{ height: 400, width: '100%' }}>
      <CommentsModal opened={commentsModal} close={commentsHandler.close}
        comments={comments} id={id}
      />
      <EmailDrawer open={emailModal} toggle={emailHandler.close}
        recipients={[adEmail]}
      />
      <DataGrid
        rows={rows}
        columns={cols()}
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
