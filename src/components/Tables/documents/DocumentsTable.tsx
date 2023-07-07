import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import { DataGrid, esES, useGridApiRef } from '@mui/x-data-grid'

import { useTranslation } from 'react-i18next'

import DocumentsColumns from './DocumentsColumns'
import { useDisclosure, useFileRemove } from 'src/hooks'
import { EmailDrawer, DeleteModal, type FileProp } from 'src/components/Shared'

const TABLE_MOCK_DATA = [
  {
    id: '1',
    name: 'test',
    description: '',
    uploadedBy: 'test@gmail.com',
    uploadDate: new Date()
  },
  {
    id: '2',
    name: 'test2',
    description: '',
    uploadedBy: 'test@gmail.com',
    uploadDate: new Date()
  },
  {
    id: '3',
    name: 'test3',
    description: 'prueba',
    uploadedBy: 'test@gmail.com',
    uploadDate: new Date()
  }
]

const DocumentsTable = ({search}: DocumentsTableProps) => {
  const [storedFiles, setStoredFiles] = useState<FileProp[]>([])
  const [emailDrawerOpen, handleEmailDrawer] = useDisclosure()
  const [deleteModalOpen, handleDeleteModal] = useDisclosure()
  const { i18n } = useTranslation()
  const api = useGridApiRef()
  const removeFile = useFileRemove({ files: storedFiles, setFiles: setStoredFiles })

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

  const downloadFiles = (rowID: string) => {
    const selectedFiles= handleSelectFiles(rowID)
    console.log("download the files", selectedFiles)
  }

  const deleteFile = (rowID: string) => {
    handleSelectFiles(rowID)
    handleDeleteModal.open()
  }

  const handleDeleteFile = () => {
    console.log("DELETE FILES", storedFiles)
  }

  const handleRemoveFile = (file: FileProp) => {
    const uncheck: string[] = []
    storedFiles.forEach(storedFile => storedFile.name !== file.name && uncheck.push(storedFile.id as string))
    removeFile(file)
    api.current.setRowSelectionModel(uncheck)
  }

  const tableCols = DocumentsColumns({ openMailModal, downloadFiles, deleteFile })

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
      <DeleteModal handleDelete={handleDeleteFile} modalOpen={deleteModalOpen}
        close={handleDeleteModal.close} name='document' count={storedFiles.length}
        gender={storedFiles.length === 1 ? 'este' : 'estos'}
      />
      <Box mt={5} sx={{ width: '100%' }}>
        <DataGrid
          autoHeight
          apiRef={api}
          rows={TABLE_MOCK_DATA}
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
          localeText={i18n.language === 'es' ? esES.components.MuiDataGrid.defaultProps.localeText : undefined}
        />
      </Box>
    </>
  )
}

type DocumentsTableProps = {
  search: string
  filter?: string
}

export default DocumentsTable
