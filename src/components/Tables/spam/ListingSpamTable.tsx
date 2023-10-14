import { Box } from '@mui/system'
import { DataGrid, esES, GridValidRowModel } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { DeleteModal } from 'src/components'
import { useDisclosure } from 'src/hooks'
import useSpam from 'src/hooks/useSpam'
import ListingSpamColumns from './ListingSpamColumns'

const ListingSpamTable = ({
  rows,
  isLoading,
  idPage
}: {
  rows: GridValidRowModel[]
  isLoading: boolean
  idPage: string | string[] | undefined
}) => {
  const [paginationModel] = useState({
    page: 0,
    pageSize: 25
  })
  const { pageSize } = paginationModel

  const [deleteModalOpen, handleDeleteOpenModal] = useDisclosure()

  const [selectedPhone, setSelectedPhone] = useState<string>('')

  const {
    mutateDeleteSpamQuery: { isLoading: isLoadingDelete, mutate: mutateDeleteSpam }
  } = useSpam({ idPage: idPage as string | undefined })

  const handleDeleteModal = () => {
    mutateDeleteSpam(selectedPhone, {
      onSuccess: () => {
        handleDeleteOpenModal.close()
      }
    })
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
          loading={isLoading || isLoadingDelete}
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
