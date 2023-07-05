import { useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'

import { useTranslation } from 'react-i18next'

import { type LedgerAccountRow } from './LedgerAccountTable'

import { ActionButton } from 'src/components/Shared'

type LedgerAccountRowProps = {
  row: LedgerAccountRow
  openDrawer: (id: string) => void
  deleteLedgerAccount: (id: string) => void
}

export const LedgerAccountTableRow = ({ row, openDrawer, deleteLedgerAccount }: LedgerAccountRowProps) => {
  const { id, ledgerAccount, name, accItem, relatedAcc, amortization, active } = row

  const [status, setStatus] = useState(active)
  const { t } = useTranslation()
  const ledgerStatus = status ? 'active' : 'inactive'

  return (
    <TableRow>
      <TableCell>{ledgerAccount}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{accItem}</TableCell>
      <TableCell>{relatedAcc}</TableCell>
      <TableCell>{amortization}</TableCell>
      <TableCell>
        <Stack direction='row' gap={2}>
          <ActionButton title={t('edit')} icon='tabler:edit'
            buttonProps={{ onClick: () => openDrawer(id) }}
          />
          <ActionButton title={t('delete')} icon='tabler:trash'
            buttonProps={{ onClick: () => deleteLedgerAccount(id) }}
          />
          <Tooltip title={t(`manager-status.${ledgerStatus}`)}>
            <Checkbox color="success" checked={status} onChange={() => setStatus(!status)}/>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  )
}
