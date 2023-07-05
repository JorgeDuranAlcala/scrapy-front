import { useState } from 'react'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import { ThemeProvider } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Link from 'next/link'

// ** Custom components
import Icon from 'src/@core/components/icon'
import { TablePagination } from 'src/components/Tables/pagination'

// ** Custom styles
import stackTheme from 'src/@core/styles/stackTheme'

type TransactionTableProps = {
  rows: {
    number: number
    issueDate: Date
    paymentDate: Date
    taxBase: number
    VAT: number
    RE: number
    taxWithholding: number
    total: number
  }[]
}

const lastSevenYears = () => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const yearArr: number[] = []
  for (let prev = 0; prev < 7; prev++) yearArr.push(currentYear - prev)

  return yearArr
}

const BillingTable = ({ rows }: TransactionTableProps) => {
  const { t, i18n } = useTranslation()
  const [year, setYear] = useState(new Date().getFullYear())
  const [visibleRows, setVisibleRows] = useState<typeof rows>(rows.slice(0, 20))

  const visibleRowsChange = (array: unknown) => {
    setVisibleRows(array as typeof rows)
  }

  return (
    <>
      <ThemeProvider theme={stackTheme}>
      <Stack justifyContent='space-between' mb={5}>
        <Select value={year} onChange={e => setYear(e.target.value as number)}>
          {lastSevenYears().map(year => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
        <Button variant='outlined' color='secondary' startIcon={<Icon icon='tabler:download' />}>
          {t('download')}
        </Button>
      </Stack>
      </ThemeProvider>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>{t('number')}</TableCell>
            <TableCell align='left'>{t('issue-date')}</TableCell>
            <TableCell align='left'>{t('payment-date')}</TableCell>
            <TableCell align='left'>{t('tax-base')}</TableCell>
            <TableCell align='left'>{t('VAT')}</TableCell>
            <TableCell align='left'>{t('RE')}</TableCell>
            <TableCell align='left'>{t('tax-withholding')}</TableCell>
            <TableCell align='left'>{t('total')}</TableCell>
            <TableCell align='center'>{t('options')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map(row => (
            <TableRow key={row.number}>
              <TableCell size='small' align='left'>
                <Link href='#'>{`#${row.number}`}</Link>
              </TableCell>
              <TableCell size='small' align='left'>
                {row.issueDate.toLocaleDateString(i18n.language)}
              </TableCell>
              <TableCell align='left'>{row.paymentDate.toLocaleDateString(i18n.language)}</TableCell>
              <TableCell align='left'>{row.taxBase}</TableCell>
              <TableCell align='left'>{row.VAT}</TableCell>
              <TableCell align='left'>{row.RE}</TableCell>
              <TableCell align='left'>{row.taxWithholding}</TableCell>
              <TableCell align='left'>{row.total}</TableCell>
              <TableCell align='center'>
                <Stack justifyContent='center' direction='row' spacing={0.25}>
                  <IconButton onClick={() => console.log('see')}>
                    <Icon width={22} icon='tabler:eye' />
                  </IconButton>
                  <IconButton onClick={() => console.log('edit')}>
                    <Icon width={22} icon='tabler:mail' />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination rows={rows} setVisibleRows={visibleRowsChange} emptyRowPadding={68} />
    </>
  )
}

export default BillingTable
