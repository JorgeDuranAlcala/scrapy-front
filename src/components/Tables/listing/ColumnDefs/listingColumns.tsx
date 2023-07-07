import { GridColDef} from '@mui/x-data-grid'

import { StatusSelect } from '../components'
import ListingOptionColumn from 'src/components/Shared/ListingOptionsColumn'

type optionActions = {
  // openDeleteModal: (id: string) => void
  // openCommentsModal: (comments: string) => (id: string) => void
  openEmailModal: (email: string) => void
}

const listingColumns = ({openEmailModal}: optionActions): GridColDef[] => {
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
      renderCell: (row) =>
        <ListingOptionColumn {...row} openEmailModal={openEmailModal}/>
    }
  ]
}

export default listingColumns
