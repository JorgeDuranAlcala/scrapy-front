import { GridColDef } from '@mui/x-data-grid'

import EmailField from '../components/EmailField'

const collapsibleTable = (): GridColDef[] => {
  return [
    {
      field: 'bathrooms',
      headerName: 'Baños',
      filterable: false,
      minWidth: 120,
      disableColumnMenu: true,
      sortable: false,
      flex: 0.1
    },
    {
      field: 'rooms',
      headerName: 'Habitaciones',
      filterable: false,
      minWidth: 100,
      disableColumnMenu: true,
      sortable: false,
      flex: 0.15

    },
    {
      field: 'adSite',
      headerName: 'Publicado en',
      filterable: false,
      minWidth: 300,
      disableColumnMenu: true,
      sortable: false,
      flex: 0.1

    },
    {
      field: 'adDate',
      headerName: 'Fecha anuncio',
      filterable: false,
      minWidth: 120,
      disableColumnMenu: true,
      sortable: false,
      flex: 0.15

    },
    {
      field: 'adOwner',
      headerName: 'Nombre anunciante',
      filterable: false,
      minWidth: 100,
      disableColumnMenu: true,
      sortable: false,
      flex: 0.15

    },
    {
      field: 'email',
      headerName: 'Email',
      filterable: false,
      minWidth: 120,
      disableColumnMenu: true,
      sortable: false,
      flex: 0.2,
      editable: true,
      renderEditCell: (row) => <EmailField {...row}/>
    },
    {
      field: 'nameAndLastname',
      headerName: 'Usuario',
      filterable: false,
      minWidth: 100,
      disableColumnMenu: true,
      sortable: false,
      flex: 0.2
    }
  ]
}

export default collapsibleTable
