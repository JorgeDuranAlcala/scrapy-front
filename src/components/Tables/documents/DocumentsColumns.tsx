import Link from 'next/link'

import Box from "@mui/material/Box"
import Stack from '@mui/material/Stack'
import MuiLink from '@mui/material/Link'
import Tooltip from "@mui/material/Tooltip"
import { GridColDef} from '@mui/x-data-grid'

import { useTranslation } from 'react-i18next'

import { ActionButton, EditableColumn } from 'src/components/Shared'

type optionActions = {
  downloadFiles: (id: string) => void
  openMailModal: (rowID: string) => void
  deleteFile:(id: string) => void
}

const DocumentsColumns = ({openMailModal, downloadFiles, deleteFile}: optionActions): GridColDef[] => {
  const { t, i18n } = useTranslation()

  return [
    {
      field: 'name',
      headerName: t('file-name') as string,
      filterable: false,
      sortable: false,
      width: 250,
      renderCell: ({row: {name}}) => (
        <MuiLink component={Link} href={'#'}>
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
      width: 440,
      renderCell: ({row: {description}}) =>
        <Tooltip placement="top" title={t('document-description-edit')}>
          <Box display="flex" minWidth="100%" minHeight="100%" alignItems="center">
            {description}
          </Box>
        </Tooltip>,
      renderEditCell: (params) => <EditableColumn {...params}/>
    },
    {
      field: 'uploadedBy',
      headerName: t('uploaded-by') as string,
      sortable: false,
      filterable: false,
      width: 220
    },
    {
      field: 'uploadDate',
      headerName: t('upload-date') as string,
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: ({row: {uploadDate}}) => uploadDate.toLocaleDateString(i18n.language)
    },
    {
      field: 'options',
      headerName: t('options') as string,
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: ({id}) =>
      <Stack justifyContent='start' direction='row' spacing={0.25}>
        <ActionButton title={t('download')} icon='tabler:download'
          buttonProps={{onClick: () => { downloadFiles(id as string) }}}
        />
        <ActionButton  title={t('delete')} icon='tabler:trash'
          buttonProps={{ onClick: () => deleteFile(id as string) }}
        />
        <ActionButton title={t('send-email')} icon='tabler:mail'
          buttonProps={{onClick: () => { openMailModal(id as string) }}}
        />
      </Stack>
    }
  ]
}

export default DocumentsColumns
