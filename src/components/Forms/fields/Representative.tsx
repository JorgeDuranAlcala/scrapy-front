import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import HelperText from "@mui/material/FormHelperText"
import { ThemeProvider } from '@mui/material'

import { useTranslation } from 'react-i18next'
import { Controller, useFormContext } from 'react-hook-form'

import { selectFilled } from 'src/@core/styles/smallFilledSelect'

const Representative = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const options: string[] = []

  return (
    <ThemeProvider theme={selectFilled}>
      <FormControl sx={{ minWidth: "30%"}} error={errors.represents !== undefined}>
        <InputLabel id='represents-label'
          sx={{
            "&.MuiInputLabel-root": {
              position: "absolute", top: "-8px", color: errors.represents && "error.main"
            }
          }}>
          {t('represents')}
        </InputLabel>
        <Controller
          name='represents'
          control={control}
          render={({ field: { onChange, ...rest} }) => (
            <Select
              {...rest}
              onChange={(event) => { console.log(event), onChange(event)}}
              variant="filled"
              id='represents'
              error={Boolean(errors.represents)}
            >
              <MenuItem value="ejemplo">ejemplo</MenuItem>
              {options.map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              )) }
            </Select>
          )}
          />
      {errors.represents && (
        <HelperText>{t('form-error.empty-select_other')}</HelperText>
      )}
      </FormControl>
    </ThemeProvider>
  )
}

export default Representative
