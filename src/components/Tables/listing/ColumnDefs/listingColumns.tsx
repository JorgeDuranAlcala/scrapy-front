import { GridColDef} from '@mui/x-data-grid'

import listingOptionColumn from 'src/components/Shared/ListingOptionsColumn'
import { STATUSES } from 'src/types'

type optionActions = {
  openCommentsModal: (id: string, comments: string) => void
  openEmailModal: (email: string) => void
  route: string
  edit?: boolean
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
      editable: true,
      width: 280
    },
    {
      field: 'price',
      type: 'number',
      headerName: 'Precio',
      filterable: false,
      editable: true,
      preProcessEditCellProps: (params) => ({ ...params.props, error: Number.isNaN(params.props.value)}),
      width: 100
    },
    {
      field: 'meters',
      type: 'number',
      headerName: 'Metros 2',
      filterable: false,
      editable: true,
      preProcessEditCellProps: (params) => ({ ...params.props, error: Number.isNaN(params.props.value)}),
      width: 100,
    },
    {
      field: 'sqrMtrPrice',
      headerName: 'Precio M2',
      filterable: false,
      valueGetter: ({row: { price, meters}}) => Math.ceil(price / meters),
      width: 120,
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      filterable: false,
      editable: true,
      width: 100,
    },
    {
      field: 'state',
      type: 'singleSelect',
      headerName: 'Estado',
      filterable: false,
      editable: true,
      width: 140,
      valueFormatter: ({value}) => !value || value === '' ? 'Ninguno' : STATUSES[value][1],
      valueOptions: STATUSES as any,
      getOptionLabel: ([, name]: any) => name,
      getOptionValue: ([id, ]: any) => id
    },
    {
      type: 'actions',
      field: 'options',
      headerName: 'Opciones',
      headerAlign: 'left',
      width: 260,
      getActions: (row) => listingOptionColumn({...row, listingSite: route, openEmailModal, openCommentsModal })
    }
  ]
}

export default listingColumns
