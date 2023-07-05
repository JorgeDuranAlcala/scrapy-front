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
import { useTranslation } from 'react-i18next'



import { GridRowProps, GridRow } from '@mui/x-data-grid'

const ListingTableRow = () => {
  // const { t } = useTranslation()
  // const [ opened, setOpen ] = useState(false)

  // const {commercialName, phones, email, tags}: TAccountsRow = gridRowProps.row as any

  // return (
  //   <>
  //     <Stack direction={"row"} alignItems="center" justifyContent="center"
  //       borderBottom={({palette})=> `${palette.divider} solid 1px`}
  //       sx={({palette}) => ({"&:hover": {backgroundColor: palette.customColors.tableHeaderBg}})}
  //     >
  //       <Box px={"10px"}>
  //         <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!opened)}>
  //             <Icon icon={`tabler:${opened ? 'chevron-up' : 'chevron-down'}`} width={20}/>
  //         </IconButton>
  //       </Box>
  //       <GridRow {...gridRowProps}/>
  //     </Stack>
  //     <Collapse in={opened} timeout='auto'>
  //       <Box sx={{ margin: 2, width: "100%" }}>
  //         <Table size='small' aria-label='purchases'>
  //           <TableHead>
  //             <TableRow>
  //               <TableCell align='left'>{t('commercial-name_one')}</TableCell>
  //               <TableCell align='left'>{t('phone_one')}</TableCell>
  //               <TableCell align='left'>{t('email')}</TableCell>
  //               <TableCell align='left'>Tags</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             <TableRow>
  //               <TableCell align='left'>{commercialName}</TableCell>
  //               <TableCell align='left'>{phones.join(" / ")}</TableCell>
  //               <TableCell align='left'>{email}</TableCell>
  //               <TableCell align='left'>{tags}</TableCell>
  //             </TableRow>
  //           </TableBody>
  //         </Table>
  //       </Box>
  //     </Collapse>
  //   </>
  // )
}

// type AccountsRowProps = {
//   gridRowProps: GridRowProps,
// }

export default ListingTableRow
