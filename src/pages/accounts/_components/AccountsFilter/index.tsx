import { useEffect } from 'react'

import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { AccountsAdvancedFilterQuery } from '../../_types'
import { accountsFilterSchema } from './_yup'
import { accountsconditionArr, accountsfieldsFilter } from './_const'
import { accountsDefaultFilterValues } from '../../_const'

type FilterProps = {
  data: AccountsAdvancedFilterQuery
  index: number
  setFilter: (data: AccountsAdvancedFilterQuery) => void
  deleteFilter: (index: number) => void
}

const AccountsFilter = ({ data, index, setFilter, deleteFilter }: FilterProps) => {
  const { t } = useTranslation()
  const {
    formState: { errors },
    control,
    watch,
    reset
  } = useForm({
    defaultValues: data,
    mode: 'onBlur',
    resolver: yupResolver(accountsFilterSchema)
  })

  const handleDelete = () => {
    reset(accountsDefaultFilterValues)
    deleteFilter(index)
  }

  useEffect(() => {
    const subscribed = watch(values => setFilter(values as AccountsAdvancedFilterQuery))

    return () => subscribed.unsubscribe()
  }, [data, setFilter, watch])

  return (
    <Stack sx={{ width: 600 }} direction='row' spacing={8} alignItems='center'>
      <Stack spacing={1} direction='row' alignItems='center' color={grey[600]}>
        <IconButton onClick={handleDelete}>
          <Icon icon='ph:x-circle-fill' width={20} />
        </IconButton>
        <Box typography='body2'>{t('where')}</Box>
      </Stack>
      <Stack sx={{ width: 500 }} direction='row' spacing={2}>
        <FormControl fullWidth>
          <Controller
            name='field'
            rules={{ required: true }}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                size='small'
                id={'field' + index}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.field)}
              >
                {accountsfieldsFilter.map(filter => (
                  <MenuItem key={filter} value={filter}>
                    {t(filter)}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='condition'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                size='small'
                id={'condition' + index}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.condition)}
              >
                {accountsconditionArr.map(filter => (
                  <MenuItem key={filter} value={filter}>
                    {t(filter)}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='input'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                size='small'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                label={t('filter-query')}
                error={Boolean(errors.input)}
                helperText={errors.input && errors.input.message}
              />
            )}
          />
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default AccountsFilter
