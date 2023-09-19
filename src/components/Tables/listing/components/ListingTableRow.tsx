import { useState, memo, useMemo } from 'react'

import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

import { GridRowProps, GridRow, DataGrid, useGridApiContext, esES } from '@mui/x-data-grid'

import subRowColumns from '../ColumnDefs/subRowColumns'

const ListingTableRow = ({ row, ...props }: GridRowProps) => {
  const [opened, setOpen] = useState(false)
  const api = useGridApiContext()
  const setVip = (vip: boolean) => {
    api.current.updateRows([{ ...api.current.getRow(props.rowId), vip }])
  }
  const subCols = useMemo(() => subRowColumns(setVip), [])

  return (
    <>
      <Stack
        direction={'row'}
        alignItems='center'
        justifyContent='center'
        borderBottom={({ palette }) => `${palette.divider} solid 1px`}
        sx={({ palette }) => ({ '&:hover': { backgroundColor: palette.customColors.tableHeaderBg } })}
      >
        <Box px={'10px'}>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!opened)}>
            <Icon icon={`tabler:${opened ? 'chevron-up' : 'chevron-down'}`} width={20} />
          </IconButton>
        </Box>
        <GridRow {...{ row, ...props }} />
      </Stack>
      <Collapse in={opened} timeout='auto'>
        <Box sx={{ height: 115 }}>
          {opened &&
              <DataGrid
                rows={[row]}
                columns={subCols}
                processRowUpdate={(newRow) => {
                  api.current.updateRows([newRow])
                  return newRow
                }}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                disableRowSelectionOnClick
                hideFooter
                hideFooterPagination
                sx={{'.MuiDataGrid-columnHeader:first-of-type': { marginLeft: '0px' }}}
              />
          }
        </Box>
      </Collapse>
    </>
  )
}

export default memo(ListingTableRow)
