import { Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'

// * Custom components
import { TablePagination } from 'src/components/Tables/pagination'

type Props = {
  rows: unknown[] | number
  children: JSX.Element
  page: number
  setPage: Dispatch<SetStateAction<number>>
  loading: boolean
  error?: boolean
}

export const TableWrapper = ({ rows, children, page, setPage, loading, error = false }: Props) => {
  return (
    <>
      <TableContainer component={Paper}>
        {children}
        {loading && <LinearProgress />}
      </TableContainer>
      {error && (
        <Box width={"100%"} textAlign="center" p={5}>
          Error del servidor
        </Box>
        )}
      <TablePagination rows={rows} page={page} setPage={setPage} />
    </>
  )
}

export default TableWrapper
