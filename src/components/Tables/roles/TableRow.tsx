import { useContext } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { useTranslation } from 'react-i18next'

// ** Third party imports
import { useFormContext } from "react-hook-form"


// ** Context
import { ModalContext } from 'src/context'

// ** Custom components
import Icon from 'src/@core/components/icon'
import useBgColor from 'src/@core/hooks/useBgColor'

// ** Types
import type { Role } from "src/types"

export const RoleTableRow = ({row}: Props) => {
  const { role, permissions } = row
  const { open } = useContext(ModalContext)[1]
  const colors = useBgColor()
  const { t } = useTranslation()
  const { reset } = useFormContext()

  const handleOpen = () => {
    reset(row)
    open()
  }

  // Display permissions which have at least one checked field
  const selectedPermissions = permissions.filter(({ write, read }) => write || read)

  return (
    <TableRow >
      <TableCell align='left'>{role}</TableCell>
      <TableCell align='left'>
        <Stack direction='row' spacing={5}>
          { selectedPermissions.map(({code, write, read }) => {
              let color

              //if (write && read) = colors.infoLight
              if (write) color = colors.successLight
              else if (read) color = colors.warningLight

              return (
                <Box
                  key={code}
                  sx={{
                    ...color,
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    padding: '5px 10px'
                  }}
                >
                  {t(code)}
                </Box>
              )
            })}
        </Stack>
      </TableCell>
      <TableCell align='left'>
        <Stack direction='row' spacing={3}>
          <IconButton onClick={handleOpen}>
            <Icon icon='tabler:edit' />
          </IconButton>
          <IconButton>
            <Icon icon='tabler:trash' />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

type Props = {
  row: Role
}
