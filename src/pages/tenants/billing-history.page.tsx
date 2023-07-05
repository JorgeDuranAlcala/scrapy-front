import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

// ** Custom components
import { BillingTable } from 'src/components/Tables'
import { TenantTabs } from 'src/components/Navbars'

// ** Custom styles

const MOCK_TRANSACTION_DATA = [
  {
    number: 0,
    issueDate: new Date(),
    paymentDate: new Date(),
    taxBase: 2500,
    VAT: 2500,
    RE: 2500,
    taxWithholding: 2500,
    total: 2500
  }
]

for (let i = 0; i < 22; i++) {
  const { number, ...rest } = MOCK_TRANSACTION_DATA[0]
  MOCK_TRANSACTION_DATA.push({ number: i + 1, ...rest })
}

const TransactionTable = () => {
  return (
    <Stack spacing={5}>
      <TenantTabs />
      <Card>
        <CardContent>
          <BillingTable rows={MOCK_TRANSACTION_DATA} />
        </CardContent>
      </Card>
    </Stack>
  )
}

TransactionTable.acl = {
  action: 'read',
  subject: 'tenant-system'
}

export default TransactionTable
