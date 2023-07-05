import { useDispatch, useSelector } from 'react-redux'

import Select, { type SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { useTranslation } from 'react-i18next'

import { onChange, selected } from 'src/redux/slices'

export const RoleSelect = ({roles}: {roles: string[]}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const value = useSelector(selected)

  const handleRoleFilterChange = (event: SelectChangeEvent<string>) => {
    dispatch(onChange(event.target.value as string))
  }

  return (
    <FormControl variant='filled'>
      <InputLabel id='role-type'>{t('select-user-role')}</InputLabel>
      <Select
        value={value}
        onChange={handleRoleFilterChange}
        labelId='role-type'
        size='small'
        sx={{ width: 300 }}
        label={t('select-user-role') as string}
      >
        {roles.map(role => (
          <MenuItem key={role} value={role}>
            {t(role)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
