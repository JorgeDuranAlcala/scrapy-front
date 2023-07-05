// ** React imports
import React, {useState} from 'react';

// ** MUI imports
import Box from '@mui/material/Box'
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Drawer from '@mui/material/Drawer'
import Stack from "@mui/material/Stack"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material';

// ** Next imports
import Link from "next/link"

// ** Third party imports
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';

// ** Custom hooks
import { useDisclosure } from 'src/hooks'

// ** Context
import { ModalContext } from "src/context"

// ** Custom components
import { ActionButton } from 'src/components/Shared'
import { TablePagination } from 'src/components/Tables/pagination';
import { NewPluginForm, defaultNewPluginForm, NewPluginFormData,  } from 'src/components/Forms';

// ** Schemas
import { pluginsSchema, PluginPricingSchema } from 'src/schemas';

import stackTheme from 'src/@core/styles/stackTheme';

const newPluginSchema = pluginsSchema.concat(PluginPricingSchema)

type row = {
    img?: string
    name: string
    price: number
    VAT: number
    status: string
}

const rows: row[] = [
  {
    name: "test",
    price: 19.99,
    VAT: 2,
    status: "test",
  }
]

for (let i = 0; i <=51; i++){
  const img = Math.round(Math.random()*10) > 5 ? 'image' : undefined
  const row = Object.fromEntries(Object.entries(rows[0])) as row
  img && Object.assign(row, {img})
  rows.push(row)
}

const TableList = () => {
  const { t } = useTranslation()
  const [opened, { open, close}] = useDisclosure()

  const pluginForm = useForm({
    defaultValues: defaultNewPluginForm,
    mode: "onBlur",
    resolver: yupResolver(newPluginSchema)
  })

  const onSubmit = (data: NewPluginFormData) => {
    console.log(data)
  }

  const [visibleRows, setVisibleRows] = useState<typeof rows>(rows.slice(0, 5))

  const visibleRowsChange = (array: unknown) => {
    setVisibleRows(array as typeof rows)
  }

  const smCell= { width: 80 }

  return (
    <>
      <Drawer anchor='right' open={opened} onClose={close}>
        <FormProvider {...pluginForm}>
          <ModalContext.Provider value={[opened, {open, close}]}>
            <form onSubmit={pluginForm.handleSubmit(onSubmit)}>
              <Box py={10} px={7}>
                <NewPluginForm/>
              </Box>
            </form>
          </ModalContext.Provider>
        </FormProvider>
      </Drawer>
      <Card>
        <CardContent>
          <ThemeProvider theme={stackTheme}>
            <Stack justifyContent="space-between" mb={5}>
              <TextField
                sx={{minWidth: 300}}
                size="small"
                placeholder={`${t('search')} plugin`}
              />
              <Button variant='contained' onClick={open}>
                {`${t('create')} plugin`}
              </Button>
            </Stack>
          </ThemeProvider>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">{t("name")}</TableCell>
                  <TableCell align="left">{t("price")}</TableCell>
                  <TableCell sx={smCell} align="left">{`% ${t("VAT")}`}</TableCell>
                  <TableCell sx={smCell} align="left">{t("status")}</TableCell>
                  <TableCell sx={smCell} align="left">{t("options")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row, i) => (
                  <TableRow
                    key={i}
                  >
                    <TableCell size="small" align="left">
                      <Stack direction="row" spacing={5} justifyContent="start">
                        <Box sx={{minWidth: 50}}>{row.img}</Box>
                        <Box>{row.name}</Box>
                      </Stack>
                    </TableCell>
                    <TableCell size="small" align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.VAT}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell  align="center">
                      <Stack justifyContent='center' direction='row' spacing={0.25}>
                        <ActionButton title={t('see')} icon={'tabler:eye'}
                          buttonProps={{component: Link, href:"/tenants/plugins/edit" }}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination rows={rows} setVisibleRows={visibleRowsChange}/>
        </CardContent>
      </Card>
    </>
  );
}

TableList.acl = {
  action: 'read',
  subject: 'tenant-system'
}

export default TableList
