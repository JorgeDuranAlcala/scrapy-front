import { useCallback, Dispatch, SetStateAction } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import MuiTablePagination from '@mui/material/TablePagination'

const ROWS_PER_PAGE = 25

export const TablePagination = ({page, setPage, rows, emptyRowPadding, rowsPerPage = ROWS_PER_PAGE}: Props) => {
  const rowsNum = typeof rows == 'number' ? rows : rows.length
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsNum) : 0;

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);
    },[]);

  return(
    <>
      <Table>
        <TableBody>
          {/* {
            <TableRow style={{ height: (emptyRowPadding || 53) * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          } */}

        </TableBody>
      </Table>
      <MuiTablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={rowsNum}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  )
}

type Props = {
  page: number,
  setPage: Dispatch<SetStateAction<number>>
  rows: unknown[] | number
  emptyRowPadding?: number,
  rowsPerPage?: number
}
