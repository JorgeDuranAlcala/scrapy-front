import { memo, Dispatch, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import { DataGrid, esES, useGridApiRef  } from '@mui/x-data-grid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useDisclosure, useFileRemove } from 'src/hooks'

import { EmailDrawer, DeleteModal, type FileProp } from 'src/components/Shared'

import { deleteDocuments } from 'src/services'

import DocumentsColumns from './DocumentsColumns'

const DocumentsTable = ({rows, storedFiles, setStoredFiles, api}: DocumentsTableProps) => {
  const [emailDrawerOpen, handleEmailDrawer] = useDisclosure()
  const [deleteModalOpen, handleDeleteModal] = useDisclosure()
  const removeFile = useFileRemove({ files: storedFiles, setFiles: setStoredFiles })
  const queryClient = useQueryClient()

  const handleSelectFiles = (rowID?: string) => {
    const selectedFiles: FileProp[] = []

    if(rowID && !api.current.isRowSelected(rowID))
      api.current.selectRow(rowID)

    api.current.getSelectedRows().forEach((value, id) => {
      selectedFiles.push({ id: id as string, name: value.name })
    })

    setStoredFiles([...selectedFiles])
    return selectedFiles
  }

  const openMailModal = (rowID: string) => {
    handleSelectFiles(rowID)
    handleEmailDrawer.open()
  }

  const deleteFile = (rowID: string) => {
    handleSelectFiles(rowID)
    handleDeleteModal.open()
  }

  const delDocuments = useMutation({
    mutationKey: ['delete-documents'],
    mutationFn: deleteDocuments,
    onSuccess: () => {
      api.current.setRowSelectionModel([])
      toast.success('Acción completada')
      queryClient.refetchQueries(['documents'])
      handleDeleteModal.close()
    }
  })

  const FilesDeleteHandler = () => {
    const documentIds: string[] = []
    storedFiles.forEach(({id}) => id && documentIds.push(id))
    delDocuments.mutate({documentIds})
  }

  const handleRemoveFile = (file: FileProp) => {
    const uncheck: string[] = []
    storedFiles.forEach(storedFile => storedFile.name !== file.name && uncheck.push(storedFile.id as string))
    removeFile(file)
    api.current.setRowSelectionModel(uncheck)
  }

  const tableCols = DocumentsColumns({ openMailModal, deleteFile })

  return (
    <>
      <EmailDrawer
        open={emailDrawerOpen}
        toggle={handleEmailDrawer.close}
        storedFileHandling={{
          storedFiles,
          removeStoredFile: handleRemoveFile
        }}
      />
      <DeleteModal handleDelete={FilesDeleteHandler} modalOpen={deleteModalOpen}
        close={handleDeleteModal.close} name='document' count={storedFiles.length}
        gender={storedFiles.length === 1 ? 'este' : 'estos'}
      />
      <Box mt={5} sx={{ width: '100%', height: 430 }}>
        <DataGrid
          apiRef={api}
          rows={rows}
          onRowSelectionModelChange={(rowIds) => {
            if(rowIds.length === 0) setStoredFiles([])
            else rowIds.forEach((id) => handleSelectFiles(id as string))
          }}
          columns={tableCols}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25
              }
            }
          }}
          disableRowSelectionOnClick
          checkboxSelection
          pageSizeOptions={[25]}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </>
  )
}

type DocumentData = {
  id: string,
  name: string,
  viewLink: string,
  downloadLink: string
}

type DocumentsTableProps = {
  rows: DocumentData[]
  api: ReturnType<typeof useGridApiRef>
  storedFiles: FileProp[]
  setStoredFiles: Dispatch<SetStateAction<FileProp[]>>
}

export default memo(DocumentsTable)
