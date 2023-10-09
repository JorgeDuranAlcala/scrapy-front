import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import MuiLink from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import { GridColDef } from '@mui/x-data-grid'

import { useTranslation } from 'react-i18next'

import { ActionButton, EditableColumn } from 'src/components/Shared'

type optionActions = {
  openMailModal: (rowID: string) => void
  deleteFile: (id: string) => void
}

const DocumentsColumns = ({ openMailModal, deleteFile }: optionActions): GridColDef[] => {
  const { t, i18n } = useTranslation()

  return [
    {
      field: 'name',
      headerName: t('file-name') as string,
      filterable: false,
      sortable: false,
      width: 250,
      renderCell: ({ row: { name, viewLink } }) => (
        <MuiLink component='a' href={viewLink} target='blank'>
          {name}
        </MuiLink>
      )
    },
    {
      field: 'description',
      headerName: t('description') as string,
      sortable: false,
      filterable: false,
      editable: true,
      width: 480,
      renderCell: ({ row: { description } }) => (
        <Tooltip placement='top' title={t('document-description-edit')}>
          <Box display='flex' minWidth='100%' minHeight='100%' alignItems='center'>
            {description}
          </Box>
        </Tooltip>
      ),
      renderEditCell: params => <EditableColumn {...params} />
    },
    {
      field: 'uploadedBy',
      headerName: t('uploaded-by') as string,
      sortable: false,
      filterable: false,
      width: 180
    },
    {
      field: 'createdAt',
      headerName: t('upload-date') as string,
      sortable: false,
      filterable: false,
      valueFormatter: ({ value }) => value?.slice(0, 10),
      width: 180
    },
    {
      field: 'options',
      headerName: t('options') as string,
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: ({ id, row: { downloadLink } }) => (
        <Stack justifyContent='start' direction='row' spacing={0.25}>
          <ActionButton
            title={'Descargar'}
            icon='tabler:download'
            buttonProps={{ href: downloadLink, download: true }}
          />
          <ActionButton
            title='Eliminar'
            icon='tabler:trash'
            buttonProps={{ onClick: () => deleteFile(id as string) }}
          />
          <ActionButton
            title='Enviar email'
            icon='tabler:mail'
            buttonProps={{
              onClick: () => {
                openMailModal(id as string)
              }
            }}
          />
        </Stack>
      )
    }
  ]
}

export default DocumentsColumns
