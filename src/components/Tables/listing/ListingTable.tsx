import { useState, useCallback, memo, useMemo, Dispatch, SetStateAction} from 'react'

import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import { DataGrid, esES, GridCellModesModel, GridValidRowModel, useGridApiRef } from '@mui/x-data-grid'

import ListingRow from './components/ListingTableRow'
import useColumns from './ColumnDefs/listingColumns'

import { CommentsModal, EmailDrawer } from 'src/components/Shared'

// ** Hook imports
import { useDisclosure } from 'src/hooks'

type PaginationModel = { pageSize: number, page: number }

type Props = {
  columnDefinition: typeof useColumns
  rows: GridValidRowModel[]
  paginationModel: PaginationModel
  setPaginationModel: Dispatch<SetStateAction<PaginationModel>>
  rowLength: number
}

const ListingTable = ({columnDefinition, rows =[], rowLength, paginationModel, setPaginationModel}: Props) => {
  const { query } = useRouter()
  const [comments, setComments] = useState('')
  const [id, setID] = useState('')
  const [adEmail, setAdEmail] = useState('')
  const [commentsModal, commentsHandler] = useDisclosure()
  const [emailModal, emailHandler] = useDisclosure()

  const openEmailModal = useCallback((email: string) => {
    setAdEmail(email)
    emailHandler.open()
  }, [])

  const openCommentsModal = useCallback((id: string, comment: string) => {
    setID(id)
    setComments(comment)
    commentsHandler.open()
  }, [])

  const cols = useMemo(() => (
    columnDefinition({openEmailModal, openCommentsModal, route: query.id as string})
    ), [])

  const dataGridProps = useMemo(() => ({
    initialState: {
      pagination: {
        disableRowSelectionOnClick: true,
        paginationModel: {
          pageSize: 10
        }
      },
    },
    sx:{
      '& .MuiDataGrid-row:hover': { backgroundColor: 'transparent' },
      '.MuiDataGrid-columnHeader:first-of-type': { marginLeft: '40px' },
      '.MuiDataGrid-cell--editable': { cursor:'pointer'}
    },

    /* TODO: pass the "mutate" method returned by the useMutation hook
      to update server side data when making changes

      slotProps: {
      mutate
      }
    */
    slots: {
      row: ListingRow
    },
    disableVirtualization: true,
    disableRowSelectionOnClick: true,
    localeText: esES.components.MuiDataGrid.defaultProps.localeText,
    columns: cols
  }), [])

  return (
    <Box mt={5} sx={{ height: 400, width: '100%' }}>
      <CommentsModal opened={commentsModal} close={commentsHandler.close}
        comments={comments} id={id}
      />
      <EmailDrawer open={emailModal} toggle={emailHandler.close}
        recipients={adEmail!== '' ? [adEmail] : []}
      />
      <DataGrid
        rows={rows}
        pageSizeOptions={[10]}
        {...dataGridProps}
      />
    </Box>
  )
}


export default memo(ListingTable)
