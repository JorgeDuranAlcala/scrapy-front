//* React imports
import React, { useState, useCallback } from 'react';

//* Mui imports
import Button from "@mui/material/Button"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material';

//* Next imports
import Link from "next/link"

//* Third party imports
import { useTranslation } from 'react-i18next';

//* Icon imports
import Icon from 'src/@core/components/icon'

import stackTheme from 'src/@core/styles/stackTheme';

//* Custom Components
import { EmailDrawer, ActionButton } from 'src/components/Shared';

//*Custom hooks
import { useDisclosure } from 'src/hooks';

const ROWS_PER_PAGE = 5

const rows = [
  {
    businessName: "test",
    NIF: "123456789",
    city: "test",
    phone: "+584247748533",
    email: "test1@gmail.com",
    monthlyCost: 3500,
    managerOptions: ['John Doe', 'Tester1', 'Tester2'],
    manager: 'John Doe',
  },
  {
    businessName: "test",
    NIF: "123456789",
    city: "test",
    phone: "+584247748533",
    email: "test2@gmail.com",
    monthlyCost: 3500,
    managerOptions: ['John Doe', 'Tester1', 'Tester2'],
    manager: 'Tester1'
  },
  {
    businessName: "test",
    NIF: "123456789",
    city: "test",
    phone: "+584247748533",
    email: "test3@gmail.com",
    monthlyCost: 3500,
    managerOptions: ['John Doe', 'Tester1', 'Tester2'],
    manager: 'John Doe'
  },
  {
    businessName: "test",
    NIF: "123456789",
    city: "test",
    phone: "+584247748533",
    email: "test4@gmail.com",
    monthlyCost: 3500,
    managerOptions: ['John Doe', 'Tester1', 'Tester2'],
    manager: 'Tester2'
  },
  {
    businessName: "test",
    NIF: "123456789",
    city: "test",
    phone: "+584247748533",
    email: "test5@businessTest.com",
    monthlyCost: 3500,
    managerOptions: ['John Doe', 'Tester1', 'Tester2'],
    manager: 'Tester1'
  },
  {
    businessName: "test",
    NIF: "123456789",
    city: "test",
    phone: "+584247748533",
    email: "test6@gmail.com",
    monthlyCost: 3500,
    managerOptions: ['John Doe', 'Tester1', 'Tester2'],
    manager: 'Tester2'
  }
]

const TableList = () => {
  const { t } = useTranslation()

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE)
  const [visibleRows, setVisibleRows] = useState<typeof rows>(rows.slice(0, ROWS_PER_PAGE));
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [ openEmailDrawer, handleEmailDrawer ] = useDisclosure()

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

  const changeManager = (tenantId: string, managerId: string) => {
    //mutate(tenantId, managerId)
    console.log(`mutating data for:\nTenant ID: ${tenantId}\n ManagerId: ${managerId}`)
  }

  const smCell= { width: 120}
  const lgCell= { minWidth: 140}

  return (
    <>
      <EmailDrawer open={openEmailDrawer} toggle={handleEmailDrawer.close}/>
      <Card>
        <CardContent>
          <ThemeProvider theme={stackTheme}>
            <Stack justifyContent="space-between" mb={5}>
              <TextField
                sx={{minWidth: 300}}
                size="small"
                placeholder={t('search') as string}
              />
              <Stack direction="row" spacing={5} alignItems="center">
                <Button
                  variant='outlined'
                  color='secondary'
                  startIcon={<Icon icon="tabler:download"/>}
                >
                  {t('create-invoice')}
                </Button>
                <Button variant="contained"
                  component={Link} href={"/tenants/new"}
                >
                  {`${t('create')} tenant`}
                </Button>
              </Stack>
            </Stack>
          </ThemeProvider>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={lgCell} align="left">{t("business-name")}</TableCell>
                  <TableCell sx={{width: 60}} align="left">{t("NIF")}</TableCell>
                  <TableCell sx={{minwidth: 170}} align="left">{t("city")}</TableCell>
                  <TableCell sx={{width: 100}} align="left">{t("phone_one")}</TableCell>
                  <TableCell sx={{width: 100}} align="left">{t("email")}</TableCell>
                  <TableCell sx={smCell} align="left">{t("monthly-cost")}</TableCell>
                  <TableCell sx={smCell} align="left">{t("manager")}</TableCell>
                  <TableCell sx={smCell} align="center">{t("options")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow
                    key={row.email}
                  >
                    <TableCell size="small" align="left">{row.businessName}</TableCell>
                    <TableCell size="small" align="left">{row.NIF}</TableCell>
                    <TableCell align="left">{row.city}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.monthlyCost}</TableCell>
                    <TableCell align="left">
                      <Select
                        size="small"
                        defaultValue={row.manager}
                        onChange={(e) => changeManager('id', e.target.value as string)}
                      >
                        {row.managerOptions.map((manager) =>
                          <MenuItem key={manager} value={manager}>{manager}</MenuItem>
                        )}
                      </Select>
                    </TableCell>
                    <TableCell  align="center">
                      <Stack justifyContent='center' direction='row' spacing={0.25}>
                        <ActionButton title={t('see')} icon={'tabler:eye'}
                          buttonProps={{ component: Link, href: "/tenants/edit" }}
                        />
                        <ActionButton title={t('delete')} icon={'tabler:trash'}
                          buttonProps={{ onClick: () => { console.log('delete')}}}
                        />
                        <ActionButton title={t('send-email')} icon={'tabler:mail'}
                          buttonProps={{ onClick: handleEmailDrawer.open }}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 &&
                (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </>
  );
}

TableList.acl = {
  action: 'read',
  subject: 'tenant-system'
}

// type Row= {
//   businessName: string
//   NIF: string
//   city: string
//   phone: string
//   email: string
//   monthlyCost: number
//   manager: string
// }

export default TableList
