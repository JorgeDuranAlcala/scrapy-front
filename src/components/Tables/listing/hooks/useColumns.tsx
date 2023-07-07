import Link from 'next/link'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { GridColDef} from '@mui/x-data-grid'

import { Counter, StatusSelect } from '../components'
import { ActionButton } from 'src/components/Shared'

type optionActions = {
  // openDeleteModal: (id: string) => void
  // openCommentsModal: (comments: string) => (id: string) => void
  openEmailModal: (email: string) => void
}

const useColumns = ({openEmailModal}: optionActions): GridColDef[] => {

  return [
    {
      field: 'operation',
      headerName: 'Operacion',
      filterable: false,
      width: 120,
    },
    {
      field: 'category',
      headerName: 'Categoría',
      filterable: false,
      width: 100,
    },
    {
      field: 'title',
      headerName: 'Título',
      filterable: false,
      width: 300
    },
    {
      field: 'price',
      headerName: 'Precio',
      filterable: false,
      width: 80
    },
    {
      field: 'meters',
      headerName: 'Metros',
      filterable: false,
      width: 100
    },
    {
      field: 'sqrMtrPrice',
      headerName: 'Precio MT2',
      filterable: false,
      width: 120,
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      filterable: false,
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Estado',
      filterable: false,
      width: 140,
      renderCell: ({row: { status }}) => <StatusSelect value={status}/>
    },
    {
      field: 'options',
      headerName: 'Opciones',
      width: 260,
      filterable: false,
      sortable: false,
      renderCell: ({id, row: { comments, link, count, email }}) =>
      <Stack justifyContent='start' direction='row' alignItems='center' gap={0.25}>
        <a href={link}>
          <ActionButton title={'Ver'} icon='tabler:eye'
            buttonProps={{sx: {padding:"4px"}}}
          />
        </a>
        <ActionButton title={'Enviar email'} icon='tabler:mail'
          buttonProps={{
            onClick: () => {openEmailModal(email) },
            sx: {padding:"4px"}
          }}
        />
        <Box padding={"4px"}>
          <Counter value={count} />
        </Box>
        <ActionButton title={'Adjuntar'} icon='tabler:paperclip'
          buttonProps={{
            component: Link,
            href: `/documents/${id}`,
            passHref: true,
            sx: {padding:"4px"}
          }}
        />
        <ActionButton title='Info' icon='tabler:info-circle-filled'
          buttonProps={{sx: {padding:"4px"}}}
        />
        {/* <ActionButton title='Comentarios'
          icon={`majesticons:${comments.length === 0 ? 'comment-text-line' : 'comment-text'}`}
          buttonProps={{onClick: () => {openCommentsModal(comments)('id') }}}
        /> */}
      </Stack>
    }
  ]
}

export default useColumns
