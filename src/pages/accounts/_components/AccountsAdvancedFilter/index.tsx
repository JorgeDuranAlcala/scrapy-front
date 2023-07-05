import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import { grey } from '@mui/material/colors'
import { MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings } from 'src/@core/hooks/useSettings'

import { accountsDefaultFilterValues } from '../../_const'
import { AccountsAdvancedFilterQuery } from '../../_types'
import AccountsFilter from '../AccountsFilter'

const AccountsAdvancedFilter = () => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'advanced-filter' : undefined
  const { settings } = useSettings()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [filters, setFilters] = useState<AccountsAdvancedFilterQuery[]>([accountsDefaultFilterValues])

  const onSubmit = () => {
    console.log(filters)
  }

  const addFilter = () => {
    const currentFilters = filters.slice()
    setFilters(currentFilters.concat(accountsDefaultFilterValues))
  }

  const handleFilterChange = (index: number) => (data: AccountsAdvancedFilterQuery) => {
    filters[index] = data
    setFilters(filters)
  }

  const deleteFilter = (index: number) => {
    if (filters.length > 1) {
      const currentFilter = filters.slice()
      currentFilter.splice(index, 1)
      setFilters(currentFilter)
    } else setFilters([accountsDefaultFilterValues])
  }

  return (
    <div>
      <Button variant='outlined' color='secondary' aria-describedby={id} onClick={handleClick}>
        {t('advanced-filter')}
      </Button>
      <Popover
        anchorReference='anchorPosition'
        anchorPosition={{ top: 5000, left: 5000 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
      >
        <Card>
          <CardContent
            sx={{
              backgroundColor: settings.mode !== 'dark' ? grey[200] : grey[800],
              color: settings.mode !== 'dark' ? grey[600] : undefined,
              paddingTop: 2.5,
              paddingBottom: 2.5
            }}
          >
            <Stack direction='row' justifyContent='space-between'>
              <Stack spacing={2} direction='row' alignItems='center'>
                <Icon icon='tabler:grip-vertical' />
                <div>{t('multi-filter')}</div>
              </Stack>
              <IconButton onClick={handleClose}>
                <Icon color={grey[600]} icon='tabler:x' width={16} />
              </IconButton>
            </Stack>
          </CardContent>
          <CardContent sx={{ marginTop: 3 }}>
            <form
              onSubmit={e => {
                e.preventDefault()
                onSubmit()
              }}
            >
              <Stack spacing={5}>
                {filters.map((filter, i) => (
                  <AccountsFilter
                    data={filter}
                    key={Object.values(filter).join('') + i}
                    index={i}
                    setFilter={handleFilterChange(i)}
                    deleteFilter={deleteFilter}
                  />
                ))}
                <Stack mt={5} alignItems='center' direction='row' justifyContent='space-between'>
                  <IconButton color='success' onClick={addFilter}>
                    <Icon width={20} icon='tabler:circle-plus' />
                  </IconButton>
                  <Stack direction='row' justifyContent={'space-between'}>
                    {filters.length > 1 && (
                      <Button
                        onClick={() => {
                          setFilters([accountsDefaultFilterValues])
                        }}
                      >
                        {t('reset')}
                      </Button>
                    )}
                    <Button variant='contained' type='submit'>
                      {t('filter-action')}
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Popover>
    </div>
  )
}

export default AccountsAdvancedFilter
