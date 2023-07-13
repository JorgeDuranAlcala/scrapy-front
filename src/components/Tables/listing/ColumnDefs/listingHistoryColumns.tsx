import { GridColDef} from '@mui/x-data-grid'

import { StatusSelect } from '../components'
import listingOptionColumn from 'src/components/Shared/ListingOptionsColumn'

type optionActions = {
  openCommentsModal: (id: string, comments: string) => void
  openEmailModal: (email: string) => void
  route: string
}

const listingColumns = ({openEmailModal, openCommentsModal, route}: optionActions): GridColDef[] => {
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
      field: 'phone',
      headerName: 'Teléfono',
      filterable: false,
      width: 120,
    },
    {
      field: 'timestamp',
      headerName: 'Hora',
      filterable: false,
      valueFormatter: ({value}: {value: Date}) => {
        return value.toLocaleTimeString('es-ES', {hour12: true, hour: "numeric", minute: "numeric"})
      },
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Estado',
      filterable: false,
      editable: true,
      width: 140,
      renderCell: (props) => <StatusSelect {...props}/>,
      renderEditCell: (props) => <StatusSelect {...props}/>,
    },
    {
      field: 'email',
      headerName: 'Email',
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      hideable: false,
    },
    {
      type:'actions',
      field: 'options',
      headerName: 'Opciones',
      width: 260,
      filterable: false,
      sortable: false,
      getActions: (row) => listingOptionColumn({...row, listingSite: route, openEmailModal, openCommentsModal})
    }
  ]
}

export default listingColumns
