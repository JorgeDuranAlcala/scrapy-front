// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Component Imports
import CustomInput from 'src/views/pickers/PickersCustomInput'

export const TimePicker = ({setTime, time, label}: Props) => {
  // ** States
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  return (
    <Box sx={{ display: 'flex', flexWrap: 'no-wrap', width: "30%" }}>
      <DatePicker
        showTimeSelect
        selected={time}
        timeIntervals={15}
        showTimeSelectOnly
        dateFormat='h:mm aa'
        id='time-only-picker'
        popperPlacement={popperPlacement}
        onChange={(date: Date) => setTime(date)}
        customInput={<CustomInput label={label} />}
      />
    </Box>
  )
}

type Props = {
  setTime: (date: Date) => void
  time: DateType
  label: string
}
