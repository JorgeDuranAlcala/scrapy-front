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
import yup from 'src/@core/utils/customized-yup'

import SubRowField from '../../SubRowField'

const emailSchema = yup.string().email().required()
const numberSchema = yup.number().min(0)
const validation = (schema: yup.AnySchema) => (value: string | number) => {
  try{
    schema.validateSync(value)
    return true
  }catch{
    return false
  }
}
const validEmail = validation(emailSchema)
const isNumber = validation(numberSchema)

const ListingTableRow = ({row, handleSubRowChange, ...rest}: ListingRowProps) => {
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
                <TableCell align='left'>
                  <SubRowField value={bathrooms} id={id} name='Baños' field='bathrooms'
                    handleChange={handleSubRowChange(rest.index, 'bathrooms')}
                    validate={{ fn: isNumber, msg: 'Valor debe ser un número'}}
                  />
                </TableCell>
                <TableCell align='left'>
                <SubRowField value={rooms} id={id} name='Habitaciones' field='rooms'
                    handleChange={handleSubRowChange(rest.index, 'rooms')}
                    validate={{ fn: isNumber, msg: 'Valor debe ser un número'}}
                  />
                </TableCell>
                <TableCell align='left'>
                  <SubRowField value={adSite} id={id} name='Publicado En'
                    handleChange={handleSubRowChange(rest.index, 'adSite')}
                    field='adSite'
                  />
                </TableCell>
                <TableCell align='left'>{adDate.toLocaleDateString()}</TableCell>
                <TableCell align='left'>
                  <SubRowField value={adOwner} id={id} name='Nombre Propietario'
                      handleChange={handleSubRowChange(rest.index, 'adOwner')}
                      field='adOwner'
                    />
                </TableCell>
                <TableCell align='left'>
                  <SubRowField value={email} id={id} name='Email' field='email'
                    handleChange={handleSubRowChange(rest.index, 'email')}
                    validate={{ fn: validEmail, msg: 'Email no válido'}}
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
  handleSubRowChange: (index: number, column: string) => (data: string) => void
} & GridRowProps

export default ListingTableRow
