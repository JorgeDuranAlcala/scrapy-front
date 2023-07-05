import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import { useTranslation } from 'react-i18next'
import { useFormContext, Controller } from 'react-hook-form'

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6]

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const WeekdaySelect = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation()

  return (
    <FormControl fullWidth>
      <InputLabel id='multiple-chip-label' sx={{ color: errors.daysOpened && 'error.main' }}>
        {t('days-opened')}
      </InputLabel>
      <Controller
        name='daysOpened'
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Select
            multiple
            id='multiple-chip'
            label={t('days-opened')}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            MenuProps={MenuProps}
            error={Boolean(errors.daysOpened)}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                {selected.sort().map((select: number) => {
                  const found = WEEKDAYS.find(day => day == select)

                  return <Chip key={found} label={t(`week-days.${found}`)} sx={{ m: 0.75 }} />
                })}
              </Box>
            )}
          >
            {WEEKDAYS.map(day => (
              <MenuItem key={day} value={day}>
                {t(`week-days.${day}`)}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  )
}

export default WeekdaySelect
