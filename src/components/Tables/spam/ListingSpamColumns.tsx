import { Stack } from '@mui/system'
import { GridColDef } from '@mui/x-data-grid'
import { ActionButton } from 'src/components/Shared'

const ListingSpamColumns = ({ selectPhone }: { selectPhone: (phone: string) => void }): GridColDef[] => {
  return [
    {
      field: 'email',
      headerName: 'Email',
      filterable: false,
      flex: 1,
      minWidth: 250
    },
    {
      field: 'options',
      headerName: 'Opciones',
      filterable: false,
      sortable: false,
      minWidth: 250,
      flex: 0,
      renderCell: params => (
        <Stack justifyContent='start' direction='row' spacing={0.25}>
          <ActionButton
            title='Eliminar'
            icon='tabler:trash'
            buttonProps={{
              onClick: () => {
                selectPhone(params.row.email as string)
              }
            }}
          />
        </Stack>
      )
    }
  ]
}

export default ListingSpamColumns
