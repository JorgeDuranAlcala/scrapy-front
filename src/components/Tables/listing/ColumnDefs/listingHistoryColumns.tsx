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
      width: 280
    },
    {
      field: 'price',
      headerName: 'Precio',
      filterable: false,
      width: 100
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
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Hora',
      filterable: false,
      valueFormatter: ({value}: {value: Date}) => {
        return value.toLocaleTimeString('es-ES', {hour12: true, hour: "numeric", minute: "numeric"})
      },
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Estado',
      filterable: false,
      width: 100,
    },
    {
      type:'actions',
      field: 'options',
      headerName: 'Opciones',
      width: 220,
      filterable: false,
      sortable: false,
      getActions: (row) => listingOptionColumn({...row, listingSite: route, openEmailModal, openCommentsModal})
    }
  ]
}

export default listingColumns
