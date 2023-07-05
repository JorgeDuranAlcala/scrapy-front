import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button"
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

//* Icon imports
import Icon from 'src/@core/components/icon'

//* Custom Imports
import { type OtherAddrData } from 'src/components/Forms';

import { useTranslation } from 'react-i18next';

const Row = ({data, setEdit}: RowProps ) => {
  const {address, country, city, province, ...row } = data
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation()

  const localeName = i18n.language === 'es' ? 'nameEs' : 'nameEn'

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          <Typography noWrap>
            {address}
          </Typography>
        </TableCell>
        <TableCell align="right">{country && country[localeName]}</TableCell>
        <TableCell align="right">{province && province.name}</TableCell>
        <TableCell align="right">{city && city.name}</TableCell>
        <TableCell align="right">
          <Button variant="contained" onClick={() => setEdit()}>
            Editar
          </Button>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            <Icon icon={`tabler:chevron-${open ? 'up' : 'down'}`} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {Object.entries(row).map(([title, value], i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        <Typography sx={{fontWeight: 500}} >{title}:</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {(Array.isArray(value) && value.length === 0) || !value ? "N/A" : value }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export const CollapsibleTable = ({rows, setEdit}: TableProps) => {
  const [open, setOpen] = useState(false)

  return (
    <TableContainer component={Paper}
      sx={() => ({ marginBottom: "20px"})}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                <Icon icon={`tabler:chevron-${open ? 'up' : 'down'}`} />
              </IconButton>
              Direcciones guardadas
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell component="th">Dirección</TableCell>
                      <TableCell component="th" align="right">País</TableCell>
                      <TableCell component="th" align="right">Provincia</TableCell>
                      <TableCell component="th" align="right">Población</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <Row key={index} setEdit={()=>{setEdit(index)}} data={row} />
                    ))}
                  </TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}


type TableProps = {
  rows: OtherAddrData[]
  setEdit: (index: number) => void
}

type RowProps = {
  data: OtherAddrData
  setEdit: () => void
}
