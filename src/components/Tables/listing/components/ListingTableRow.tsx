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

const ListingTableRow = ({gridRowProps}: ListingRowProps) => {
  const [ opened, setOpen ] = useState(false)

  const {bathrooms, rooms, adSite, adDate, adOwner, userAd} = gridRowProps.row as any

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
        <GridRow {...gridRowProps}/>
      </Stack>
      <Collapse in={opened} timeout='auto'>
        <Box sx={{ margin: 2, width: "100%" }}>
          <Table size='small' aria-label='purchases'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Baños</TableCell>
                <TableCell align='left'>Habitaciones</TableCell>
                <TableCell align='left'>Publicado en</TableCell>
                <TableCell align='left'>Fecha Anuncio</TableCell>
                <TableCell align='left'>Nombre Anunciante</TableCell>
                <TableCell align='left'>Usuario Anuncio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='left'>{bathrooms}</TableCell>
                <TableCell align='left'>{rooms}</TableCell>
                <TableCell align='left'>{adSite}</TableCell>
                <TableCell align='left'>{adDate}</TableCell>
                <TableCell align='left'>{adOwner}</TableCell>
                <TableCell align='left'>{userAd}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </>
  )
}

type ListingRowProps = {
  gridRowProps: GridRowProps,
}

export default ListingTableRow
