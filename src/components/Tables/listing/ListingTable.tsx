import { useState, useCallback, memo, useMemo, Dispatch, SetStateAction} from 'react'

import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import { DataGrid, esES, GridValidRowModel } from '@mui/x-data-grid'

import ListingRow from './components/ListingTableRow'
import useColumns from './ColumnDefs/listingColumns'

import { CommentsModal, EmailDrawer } from 'src/components/Shared'

// ** Hook imports
import { useDisclosure } from 'src/hooks'

type PaginationModel = { pageSize: number, page: number }

type Props = {
  editable?: boolean
  columnDefinition: typeof useColumns
  rows: GridValidRowModel[]
  paginationModel: PaginationModel
  setPaginationModel: Dispatch<SetStateAction<PaginationModel>>
  totalRows: number
  loading?: boolean
  update?: (data: GridValidRowModel) => void
}

const sameContent = (hash1: any, hash2: any) => {
  for(const key in hash1)
    if(hash1[key] != hash2[key]) return false

  return true
}

const ListingTable = ({columnDefinition, rows =[], totalRows, loading, paginationModel, setPaginationModel, update, editable = true}: Props) => {
  const { query } = useRouter()
  const [comments, setComments] = useState('')
  const [id, setID] = useState('')
  const [adEmail, setAdEmail] = useState('')
  const [commentsModal, commentsHandler] = useDisclosure()
  const [emailModal, emailHandler] = useDisclosure()

  const openEmailModal = useCallback((email: string) => {
    if(email) setAdEmail(email)
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
    sx:{
      '& .MuiDataGrid-row:hover': { backgroundColor: 'transparent' },
      '.MuiDataGrid-columnHeader:first-of-type': { marginLeft: '40px' },
      '.MuiDataGrid-cell--editable': { cursor:'pointer'}
    },
    slotProps: { row: {editable: editable ? 'editable' : '' }},
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
        comments={comments} id={id} submit={update}
      />
      <EmailDrawer open={emailModal} toggle={emailHandler.close}
        recipients={adEmail!== '' ? [adEmail] : []}
      />
      <DataGrid
        rows={rows}
        paginationMode="server"
        {...dataGridProps}
        paginationModel={paginationModel}
        loading={loading}
        processRowUpdate={(newValue, prevValue) => {
          if(update && !sameContent(newValue, prevValue)) update(newValue)
          return newValue
        }}
        rowCount={totalRows}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  )
}


export default memo(ListingTable)
