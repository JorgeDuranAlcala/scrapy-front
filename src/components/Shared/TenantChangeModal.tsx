// ** React
import { useState, useContext } from "react"

// ** MUI Imports
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Dialog from "@mui/material/Dialog"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TextField from "@mui/material/TextField"
import LinearProgress  from "@mui/material/LinearProgress"

// ** Third party imports
import { useTranslation } from "react-i18next"
import { useQuery } from '@tanstack/react-query'

// ** Services
import { getTenants } from "src/services/tenants"

// ** Hooks
import { useAuth, useDisclosure } from "src/hooks"

// ** Custom components
import Icon from "src/@core/components/icon"
import { TablePagination } from 'src/components/Tables'

import { AbilityContext } from "src/layouts/components/acl/Can"

export const TenantChangeModal = ({unclosable = false, withButton=true}: Props) => {
  const [ search, setSearch ] = useState('')
  const ability = useContext(AbilityContext)

  const {data, isError, isLoading} = useQuery({
    queryKey: ['userTenants'],
    queryFn: getTenants
  })

  const [opened, { open, close }] = useDisclosure()
  const auth = useAuth()

  const { t } = useTranslation()

  const handleRowChange = (rows: unknown[]) => {
    console.log('electric surfing gogo')
  }

  const isOpen = unclosable || opened

  if(!auth.account) return <></>

  if((auth.tenantUser || auth.superAdmin) && !ability?.can('switch', 'tenant'))
    return <></>

  return (
    <>
      <Dialog open={isOpen} onClose={close} fullWidth maxWidth="lg">
        <Card >
          <CardContent>
            <Box marginBottom={5}>
              <TextField
                placeholder={t('search') as string}
                size="small"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Box>
            {isLoading && <LinearProgress />}
            <TableContainer component={Paper}>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell width={"40%"} align="left">{t('fiscal-name')}</TableCell>
                    <TableCell width={"20%"} align="left">{t('NIF')}</TableCell>
                    <TableCell width={"30%"} align="left">{t('email')}</TableCell>
                    <TableCell width={"10%"} align="left">{t('options')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.map((tenant) => {
                    // Use this one when real data is available
                    // const {fiscalName, NIF, email, id} = tenant
                    const {name, ID} = tenant
                    return (
                      <TableRow key={ID}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{"test"}</TableCell>
                        <TableCell>{"test"}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => {
                            auth.switchTenant(ID)
                            close()
                          }} >
                            <Icon icon="tabler:eye"/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {isError && "an error happend"}

              {data &&
                <TablePagination
                  rows={data}
                  setVisibleRows={handleRowChange}
                />
              }
          </CardContent>
        </Card>
      </Dialog>
      { withButton &&
        <Button onClick={open} >
          account
        </Button>
      }
    </>
  )
}

type Props = {
  unclosable?: boolean
  withButton?: boolean
}
