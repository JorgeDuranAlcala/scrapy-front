// ** React imports
import { useState } from 'react'

// ** MUI imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { ThemeProvider, Typography } from '@mui/material'
import { useTranslation, Trans } from 'react-i18next'

//** Next imports
import Link from "next/link"

// ** Custom components
import Icon from 'src/@core/components/icon'
import { TablePagination } from 'src/components/Tables/pagination'
import { TenantTabs } from 'src/components/Navbars'

// ** Custom styles
import stackTheme from 'src/@core/styles/stackTheme'

type PluginTableProps = {
  rows: {
    name: string
    details: string
    price: number
  }[]
}

const MOCK_PLUGIN_DATA = [
  {
    name: 'users',
    details: '1 usuario contratado',
    price: 2
  }
]

for (let i = 0; i < 22; i++) {
  MOCK_PLUGIN_DATA.push(MOCK_PLUGIN_DATA[0])
}

const PluginTable = ({ rows }: PluginTableProps) => {
  const { t } = useTranslation()

  const [visibleRows, setVisibleRows] = useState<typeof MOCK_PLUGIN_DATA>(MOCK_PLUGIN_DATA.slice(0, 5))

  const visibleRowsChange = (array: unknown) => {
    setVisibleRows(array as typeof rows)
  }

  return (
    <Stack spacing={5}>
      <TenantTabs />
      <Card>
        <CardContent>
          <Stack>
            <ThemeProvider theme={stackTheme}>
              <Stack justifyContent='space-between'>
                <span>
                  <Trans
                    i18nKey="total-cuota"
                    values={{money: 39.99}}
                    components={{
                      green: <Typography component="span" sx={(theme) => ({color: theme.palette.success.main })} />
                    }}
                  />
                </span>
                <Button variant='outlined' color='secondary' startIcon={<Icon icon='tabler:download' />}>
                  {t('download')}
                </Button>
              </Stack>
            </ThemeProvider>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>{t('plugin-name')}</TableCell>
                    <TableCell align='left'>{t('details')}</TableCell>
                    <TableCell align='left'>{t('price')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell align='left'>{t(row.name)}</TableCell>
                      <TableCell align='left'>{row.details}</TableCell>
                      <TableCell sx={{ width: 150 }} align='left'>
                        {row.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination rows={MOCK_PLUGIN_DATA} setVisibleRows={visibleRowsChange} emptyRowPadding={68} />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

PluginTable.acl = {
  action: 'read',
  subject: 'tenant-system'
}

export default PluginTable
