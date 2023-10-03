import React, { useState, memo, useMemo } from 'react'

import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { GridRowProps, GridRow, DataGrid, useGridApiContext, esES } from '@mui/x-data-grid'

import subRowColumns from '../ColumnDefs/subRowColumns'
import { updatePost } from 'src/services'

const ListingTableRow = ({ row, ...props }: GridRowProps) => {
  const [opened, setOpen] = useState(false)
  const api = useGridApiContext()
  const postUpdate = useMutation({
    mutationKey: ['update-post'],
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success('Dato actualizado')
     },
    onError: (e) => {
      toast.error("Error backend: AttributeError: 'bool' object has no attribute 'lower'")
      const {is_vip, ...data} = row as any
      api.current.updateRows([{...data, is_vip: !is_vip}])
    }
  })
  const setVip = (vip: boolean) => {
      const data = { ...api.current.getRow(props.rowId), is_vip: vip }
      postUpdate.mutate(data)
      api.current.updateRows([data])
  }

  const subCols = useMemo(() => subRowColumns(setVip, props.editable === 'editable'), [])

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
                  postUpdate.mutate(newRow)
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
