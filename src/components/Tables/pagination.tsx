import { useState, useCallback } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import MuiTablePagination from '@mui/material/TablePagination'

const ROWS_PER_PAGE = 5

export const TablePagination = ({rows, setVisibleRows, emptyRowPadding}: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE)
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      const updatedRows = rows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );
      setVisibleRows(updatedRows);
    },
    [rowsPerPage],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const updatedRows = rows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );
      setVisibleRows(updatedRows);
    },
    [],
  );

  return(
    <>
      <Table>
        <TableBody>
          {emptyRows > 0 &&
            <TableRow style={{ height: (emptyRowPadding || 53) * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          }

        </TableBody>
      </Table>
      <MuiTablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

type Props = {
  rows: unknown[]
  setVisibleRows: (array: unknown[]) => void
  emptyRowPadding?: number
}
