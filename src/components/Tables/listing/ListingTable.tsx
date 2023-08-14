import { useState, useCallback, memo, useMemo } from 'react'

import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import { DataGrid, esES, GridRowProps, GridValidRowModel } from '@mui/x-data-grid'

import ListingRow from './components/ListingTableRow'
import useColumns from './ColumnDefs/listingColumns'

import { CommentsModal, EmailDrawer } from 'src/components/Shared'

// ** Hook imports
import { useDisclosure } from 'src/hooks'

type Props = {
  columnDefinition: typeof useColumns
  rows: GridValidRowModel[]
}

const ListingTable = ({columnDefinition, rows =[]}: Props) => {
  const { query } = useRouter()
  const [tableRows, setTableRows] = useState(rows)
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

  const handleSubRowChange= useCallback((index: number, column: string) => (data: string) => {
    const newRows = rows.slice()
    newRows[index][column] = data
    setTableRows(newRows)
  }, [])

  const cols = useMemo(() => (
    columnDefinition({openEmailModal, openCommentsModal, route: query.id as string})
    ), [])

  const dataGridProps = useMemo(() => ({
    initialState: {
      pagination: {
        paginationModel: {
          pageSize: 5
        }
      },
      columns: {
        columnVisibilityModel: {
          email: false
        }
      }
    },
    sx:{
      '& .MuiDataGrid-row:hover': { backgroundColor: 'transparent' },
      '& .MuiDataGrid-columnHeader:first-of-type': { marginLeft: '40px !important' }
    },
    slots: {
      row: (props: GridRowProps) => <ListingRow handleSubRowChange={handleSubRowChange} {...props}/>
    }
  }), [handleSubRowChange])

  return (
    <Box mt={5} sx={{ height: 375, width: '100%' }}>
      <CommentsModal opened={commentsModal} close={commentsHandler.close}
        comments={comments} id={id}
      />
      <EmailDrawer open={emailModal} toggle={emailHandler.close}
        recipients={adEmail!== '' ? [adEmail] : []}
      />
      <DataGrid
        rows={tableRows}
        columns={cols}
        {...dataGridProps}
        disableRowSelectionOnClick
        pageSizeOptions={[5]}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  )
}

export default ListingTable
