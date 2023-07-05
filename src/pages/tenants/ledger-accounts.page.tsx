import { useState } from "react"

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { useTranslation } from "react-i18next"
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"

import { LedgerAccountTable } from "src/components/Tables"
import { defaultLedgAcc } from 'src/components/Forms'

import { LedgerAccountSchema } from "src/schemas"

import { ModalContext } from "src/context"

import { useDisclosure } from "src/hooks"

const MOCK_DATA = [
  {
    id: '1',
    ledgerAccount: 'string',
    name: 'string',
    accItem: 'D',
    relatedAcc: 'test',
    amortization: 1,
    active: true
  },
  {
    id: '2',
    ledgerAccount: 'string',
    name: 'string',
    accItem: 'D',
    relatedAcc: 'test',
    amortization: 1,
    active: false
  },
  {
    id: '3',
    ledgerAccount: 'string',
    name: 'string',
    accItem: 'D',
    relatedAcc: 'test',
    amortization: 1,
    active: true
  },
  {
    id: '4',
    ledgerAccount: 'string',
    name: 'string',
    accItem: 'D',
    relatedAcc: 'test',
    amortization: 1,
    active: false
  },
  {
    id: '5',
    ledgerAccount: 'string',
    name: 'string',
    accItem: 'D',
    relatedAcc: 'test',
    amortization: 1,
    active: true
  },
  {
    id: '6',
    ledgerAccount: 'string',
    name: 'string',
    accItem: 'D',
    relatedAcc: 'test',
    amortization: 1,
    active: false
  },
]


const LedgerAccounts = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [id, setId] = useState('create')
  const [formDrawerOpen, formDrawerHandler] = useDisclosure()
  const ledgerForm = useForm({
    defaultValues: defaultLedgAcc,
    mode: 'onBlur',
    resolver: yupResolver(LedgerAccountSchema)
  })

  const idChange = (ledgerAccId: string) => setId(ledgerAccId)

  return (
    <FormProvider {...ledgerForm}>
    <ModalContext.Provider value={[formDrawerOpen, formDrawerHandler]}>
      <Card>
        <CardContent>
            <Box typography='body' fontWeight={600} mb={5}>10.0 CAPITAL</Box>
            <Stack direction="row" justifyContent='space-between' alignItems='center'>
              <TextField value={search} size='small'
                onChange={(e) => {setSearch(e.target.value)}}
                />
              <Button variant="contained" onClick={() =>{
                formDrawerHandler.open()
                ledgerForm.reset(defaultLedgAcc)
                setId('create')
              }}>
                {t('create')}
              </Button>
            </Stack>
        </CardContent>
        <LedgerAccountTable
          setId={idChange}
          id={id}
          rows={MOCK_DATA}
          search={search}
          />
      </Card>
    </ModalContext.Provider>
    </FormProvider>

  )
}

LedgerAccounts.acl= {
  action: 'write',
  subject: 'tenant-system'
}

export default LedgerAccounts
