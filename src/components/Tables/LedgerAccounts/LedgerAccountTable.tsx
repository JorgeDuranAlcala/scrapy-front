import { useContext } from 'react'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import { useTranslation } from 'react-i18next'
import { useFormContext, type FieldValues } from 'react-hook-form'

import { ModalContext } from 'src/context'

// ** Custom components
import { TablePagination } from 'src/components/Tables/pagination'
import { LedgerAccountTableRow } from './LedgerAccountsRow'
import { LedgerAccountForm, defaultLedgAcc, type LedgerAccountFormData } from 'src/components/Forms'
import { DeleteModal } from 'src/components/Shared'

// ** hook
import { useDisclosure, useTablePagination } from 'src/hooks'

export type LedgerAccountRow = {
  id: string
  active: boolean
} & LedgerAccountFormData

type LedgerAccountTableProps = {
  rows: LedgerAccountRow[]
  search: string
  setId: (id: string) => void
  id: string
}

const LedgerAccountTable = ({rows, setId, id}: LedgerAccountTableProps) => {
  const { t } = useTranslation()
  const [formDrawerOpen, formDrawerHandler] = useContext(ModalContext)
  const [delModalOpen, delModalHandler] = useDisclosure()
  const { visibleRows, visibleRowsChange } = useTablePagination(rows, 5)
  const ledgerAccForm = useFormContext()

  const openDeleteModal = (recordId: string) => {
    console.log('delete')
    delModalHandler.open()
    setId(recordId)
  }

  const handleDelete = () => {
    console.log("DELETE LEDGER ACCOUNT: ", id)
  }

  const openDrawer = (recordId: string) => {
    const data = rows.find(row => row.id === recordId)
    ledgerAccForm.reset(data || defaultLedgAcc)
    formDrawerHandler.open()
    setId(recordId)
  }

  const ledgAccSubmit = (data: FieldValues) => {
    console.log(data as LedgerAccountFormData)
  }

  return (
    <>
      <Drawer anchor='right' open={formDrawerOpen} onClose={formDrawerHandler.close}>
        <form onSubmit={ledgerAccForm.handleSubmit(ledgAccSubmit)}>
          <Stack minWidth="320px" gap={5} padding={5}>
            <LedgerAccountForm/>
            <Stack direction='row' justifyContent='space-between'>
              <Button type='submit' variant='contained'>
                {t('save')}
              </Button>
              <Button color='secondary'
              onClick={formDrawerHandler.close}>
                {t('cancel')}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Drawer>
      <DeleteModal name='ledger-account' gender='esta' modalOpen={delModalOpen}
        close={delModalHandler.close} handleDelete={handleDelete}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="ledger account">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: "20%"}}>{t('ledger-account')}</TableCell>
              <TableCell sx={{width: "30%"}}>
                {t('name')}
              </TableCell>
              <TableCell sx={{width: "10%"}}>
                {t('accounting-item')}
              </TableCell>
              <TableCell>
                {t('related-account')}
              </TableCell>
              <TableCell >
                {`% ${t('amortization')}`}
              </TableCell>
              <TableCell>{t('options')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map(row => (
              <LedgerAccountTableRow
                key={row.id}
                row={row}
                openDrawer={openDrawer}
                deleteLedgerAccount={openDeleteModal}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rows={rows} setVisibleRows={visibleRowsChange} />
    </>
  )
}

export default LedgerAccountTable
