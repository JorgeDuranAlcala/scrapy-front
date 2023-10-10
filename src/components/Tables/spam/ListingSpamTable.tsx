import { Box } from '@mui/system'
import { DataGrid, esES, GridValidRowModel } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { DeleteModal } from 'src/components'
import { useDisclosure } from 'src/hooks'
import ListingSpamColumns from './ListingSpamColumns'

const ListingSpamTable = ({
  handleDelete,
  rows,
  isLoading
}: {
  handleDelete: (id: string) => void
  rows: GridValidRowModel[]
  isLoading: boolean
}) => {
  const [paginationModel] = useState({
    page: 0,
    pageSize: 25
  })
  const { pageSize } = paginationModel

  const [deleteModalOpen, handleDeleteOpenModal] = useDisclosure()

  const [selectedPhone, setSelectedPhone] = useState<string>('')

  const handleDeleteModal = () => {
    handleDelete(selectedPhone)
  }

  const handleSelectedPhone = (phone: string) => {
    setSelectedPhone(phone)
    handleDeleteOpenModal.open()
  }

  return (
    <>
      <DeleteModal
        handleDelete={handleDeleteModal}
        modalOpen={deleteModalOpen}
        close={handleDeleteOpenModal.close}
        name='document'
        gender={'este'}
      />
      <Box mt={5} sx={{ width: '100%', height: 430 }}>
        <DataGrid
          rows={rows}
          columns={ListingSpamColumns({ selectPhone: handleSelectedPhone })}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25
              }
            }
          }}
          loading={isLoading}
          disableRowSelectionOnClick
          pageSizeOptions={[pageSize]}
          paginationModel={paginationModel}
          pagination={true}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </>
  )
}

export default ListingSpamTable
