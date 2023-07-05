import { useState } from 'react'

import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'react-i18next'


// ** Custom components
import { TablePagination } from 'src/components/Tables/pagination'
import { RoleTableRow } from './TableRow'

// ** Types
import type { Role } from 'src/types'

type RoleTableProps = {
  rows: Role[]
}

const RolesTable = ({ rows }: RoleTableProps) => {
  const { t } = useTranslation()
  const [visibleRows, setVisibleRows] = useState<Role[]>(rows.slice(0, 5))

  const visibleRowsChange = (array: unknown) => {
    setVisibleRows(array as typeof rows)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 300 }} align='left'>
                {t('role')}
              </TableCell>
              <TableCell align='left'>{t('permissions')}</TableCell>
              <TableCell sx={{ width: 200 }} align='left'>
                {t('options')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => <RoleTableRow key={row.role} row={row}/>)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rows={rows} setVisibleRows={visibleRowsChange} emptyRowPadding={68} />
    </>
  )
}

export default RolesTable
