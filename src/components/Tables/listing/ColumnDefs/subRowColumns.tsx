import { GridActionsCellItem, GridColDef} from '@mui/x-data-grid'

import { EditableColumn } from 'src/components/Shared'
import Icon from 'src/@core/components/icon'

const subRowColumns = (setVip: (vip: boolean) => void): GridColDef[] => [
    {
      field: 'bathrooms',
      headerName: 'Baños',
      sortable: false,
      filterable: false,
      headerAlign: 'left',
      width: 100,
    },
    {
      field: 'rooms',
      headerName: 'Habitaciones',
      headerAlign: 'left',
      filterable: false,
      sortable: false,
      width: 150,
    },
    {
      field: 'adSite',
      headerName: 'Publicado en',
      headerAlign: 'left',
      filterable: false,
      sortable: false,
      editable: true,
      renderEditCell: (props) => <EditableColumn  {...props}/>,
      width: 250,
    },
    {
      field: 'adDate',
      type: 'date',
      headerAlign: 'left',
      headerName: 'Fecha Anuncio',
      filterable: false,
      sortable: false,
      width: 150,
    },
    {
      field: 'adOwner',
      headerName: 'Nombre propietario',
      headerAlign: 'left',
      filterable: false,
      sortable: false,
      editable: true,
      width: 250,
    },
    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'left',
      filterable: false,
      sortable: false,
      editable: true,
      width: 250,
    },
    {
      field: 'user',
      headerName: 'Usuario',
      headerAlign: 'left',
      filterable: false,
      sortable: false,
      // preProcessEditCellProps: (params) => ({}),
      width: 150,
      renderHeader: () => <></>,
    },
    {
      type: 'actions',
      field: 'vip',
      width: 50,
      renderHeader: () => <></>,
      getActions: ({row: {vip}, id, ...props}) => [
        <GridActionsCellItem
          key='vip'
          label='VIP'
          color={'warning'}
          icon={<Icon width={24} icon={`tabler:star${vip ? '-filled' : ''}`} />}
          onClick={() => {setVip(!vip)}}
        />
      ]
    }
  ]

export default subRowColumns
