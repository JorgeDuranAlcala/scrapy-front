import { useState, useEffect, use } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from "@mui/material/FormControl"

import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { restRequest } from 'src/services/rest-requests'

import { useFormContext, Controller } from 'react-hook-form';

import { type Country } from 'src/types'

const sortCountries = (countries: Country[], locale: 'nameEs' | 'nameEn') => {
  return countries.sort((a: Country, b: Country) => {
    let name1 = a[locale]
    let name2 = b[locale]
    name1 ||= a.nameNative
    name2 ||= b.nameNative

    if(name1 === name2) return 0

    return name1 > name2 ? 1 : -1
})}

export default function CountrySelect() {
  const { t, i18n } = useTranslation()
  const [options, setOptions] = useState<Country[]>([])
  const { control, formState: { errors }} = useFormContext()

  const {data, isLoading, isError} = useQuery({
    queryKey: ['countries'],
    queryFn: async () => await restRequest('GET', '/core/location/countries')
  })

  const localeName = i18n.language === 'es' ? 'nameEs' : 'nameEn'

  useEffect(() => {
    if(data)
      setOptions(sortCountries(data, localeName))
  }, [data])

  useEffect(() => {
    setOptions(sortCountries(options, localeName))
  }, [i18n.language])

  return (
    <FormControl fullWidth>
      <Controller
        name="country"
        control={control}
        render={({field: {onChange, value, ...rest}}) => (
          <Autocomplete
            {...rest}
            loading={isLoading}
            value={value}
            options={options}
            onChange={(event, newValue) => {
              onChange(newValue || null)
            }}
            getOptionLabel={(option) => option[localeName] || option.nameNative || ''
            }
            noOptionsText={t(isError ? 'loading-error': 'no-options')}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('country')}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                error={Boolean(errors.country)}
                helperText={errors.country && 'Selecciona un país'}
              />
              )}
          />
        )}
      />
    </FormControl>
  );
}
