import { useState, useCallback } from 'react'

import { useRouter } from 'next/router'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useGridApiRef } from '@mui/x-data-grid'

// Layout
import ListingLayout from 'src/layouts/ListingLayout'

// Services
import { getDocuments, createDocuments, downloadDocuments } from 'src/services/documents'

// Hook
import { useDebouncedState } from 'src/hooks'

import { FileUploader, FileProp } from 'src/components/Shared'
import { DocumentsTable } from 'src/components/Tables'

const Documents = () => {
  const [files, setFiles] = useState<FileProp[]>([])
  const [storedFiles, setStoredFiles] = useState<FileProp[]>([])
  const api = useGridApiRef()

  const [search, debouncedSearch, setSearch] = useDebouncedState('')
  const {
    query: { post_id }
  } = useRouter()

  const documents = useQuery({
    queryKey: ['documents', post_id],
    queryFn: async () => {
      const id = Number(post_id)
      if (!id || typeof Number(id) !== 'number') return []
      return await getDocuments({ postId: id })
    },
    refetchOnWindowFocus: false
  })

  const uploadDocuments = useMutation({
    mutationKey: ['create-documents'],
    mutationFn: createDocuments,
    onSuccess: () => {
      const plural = files.length === 1 ? '' : 's'
      toast.success(`Archivo${plural} Guardado${plural}`)
      setFiles([])
      documents.refetch()
    }
  })

  const handleDownload = () => {
    const links: string[] = []
    api.current.getSelectedRows().forEach(({downloadLink}) => links.push(downloadLink))
    downloadDocuments(links)
  }

  const submitFiles = () => {
    uploadDocuments.mutate({ postId: Number(post_id), attachments: files })
  }

  return (
    <ListingLayout>
      <Card>
        <CardContent>
          <FileUploader {...{ files, setFiles, documentSaveRoute: post_id as string }} submit={submitFiles} />
        </CardContent>
        <CardContent sx={{ paddingBottom: '5px' }}>
          <Stack direction={'row'} justifyContent='start'>
            <TextField
              placeholder={'Buscar'}
              size='small'
              sx={{ width: 300 }}
              value={search}
              onChange={event => {
                setSearch(event.target.value)
              }}
            />
            {storedFiles.length > 1 && (
              <Button variant='contained' onClick={handleDownload} sx={{marginLeft: 'auto'}}>
                Descargar archivos
              </Button>
            )}
          </Stack>
        </CardContent>
        <DocumentsTable
          api={api}
          storedFiles={storedFiles}
          setStoredFiles={setStoredFiles}
          rows={documents.data || []}
        />
      </Card>
    </ListingLayout>
  )
}

Documents.acl = {
  action: 'see',
  subject: 'user-pages'
}

export default Documents
