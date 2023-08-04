import { useState } from 'react'

import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { GridRowProps, GridRow } from '@mui/x-data-grid'

import EditEmail from './EmailField'

const ListingTableRow = ({row, handleEmailChange, ...rest}: ListingRowProps) => {
  const [ opened, setOpen ] = useState(false)

  const {id, bathrooms, rooms, adSite, adDate, adOwner, user, email} = row as any

  return (
    <>
      <Stack direction={"row"} alignItems="center" justifyContent="center"
        borderBottom={({palette})=> `${palette.divider} solid 1px`}
        sx={({palette}) => ({"&:hover": {backgroundColor: palette.customColors.tableHeaderBg}})}
      >
        <Box px={"10px"}>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!opened)}>
              <Icon icon={`tabler:${opened ? 'chevron-up' : 'chevron-down'}`} width={20}/>
          </IconButton>
        </Box>
        <GridRow {...{row, ...rest}}/>
      </Stack>
      <Collapse in={opened} timeout='auto'>
        <Box sx={{ margin: 2, width: "100%" }}>
          <Table size='small' aria-label='purchases'>
            <TableHead>
              <TableRow>
                <TableCell sx={{width: "5%"}} align='left'>Baños</TableCell>
                <TableCell sx={{width: "5%"}} align='left'>Habitaciones</TableCell>
                <TableCell align='left'>Publicado en</TableCell>
                <TableCell align='left'>Fecha Anuncio</TableCell>
                <TableCell sx={{width: "15%"}} align='left'>Nombre Propietario</TableCell>
                <TableCell sx={{width: "18%"}} align='left'>Email</TableCell>
                <TableCell sx={{width: "18%"}} align='left'>Usuario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='left'>{bathrooms}</TableCell>
                <TableCell align='left'>{rooms}</TableCell>
                <TableCell align='left'>{adSite}</TableCell>
                <TableCell align='left'>{adDate.toLocaleDateString()}</TableCell>
                <TableCell align='left'>{adOwner}</TableCell>
                <TableCell align='left'>
                  <EditEmail email={email} id={id}
                    handleEmailChange={handleEmailChange(rest.index)}
                  />
                </TableCell>
                <TableCell align='left'>{user}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </>
  )
}

type ListingRowProps = {
  handleEmailChange: (index: number) => (email: string) => void
} & GridRowProps

export default ListingTableRow
