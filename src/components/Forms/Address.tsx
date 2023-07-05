import { useEffect } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

import { useQuery } from '@tanstack/react-query'
import { useFormContext, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ControlledTextField, Country } from 'src/components/Forms/fields'

import { restRequest } from 'src/services'

import type { State, City, Country as CountryData } from 'src/types'

export const defaultAddressForm = {
  address: '',
  country: null,
  province: null,
  city: null,
  postalCode: '',
}

export const AddressForm = () => {

  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
    watch,
    resetField
  } = useFormContext()

  const [ country, province ] = watch(['country', 'province'])

  const provinces = useQuery({
    queryKey: [ 'province', country ],
    queryFn: async () => {
      if(country)
        return restRequest('GET',
        `/core/location/state/states_by_country/${country.id}`)

      return null
    }
  })

  const cities = useQuery({
    queryKey: [ 'city', province ],
    queryFn: async () => {
      if(province)
        return restRequest('GET',
        `/core/location/city/cities_by_state/${province.id}`)

      return null
    }
  })

  let provinceOptions: State[] = []
  let cityOptions: City[] = []

  if(country && provinces.data && !provinces.isFetching)
    provinceOptions = provinces.data

  if(provinces.data && cities.data && !cities.isFetching)
    cityOptions = cities.data

  useEffect(() => {
    resetField('city')
  }, [province])

  useEffect(() => {
    resetField('province')
    resetField('city')
  }, [country])

  return (
    <>
      <Grid item sm={12} md={8}>
        <ControlledTextField name='address' label='address' required />
      </Grid>
      <Grid item sm={12} md={4}>
        <ControlledTextField name='postalCode' label='postal-code' required />
      </Grid>
      <Grid item sm={12} md={4}>
        <Country/>
      </Grid>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='province'
            control={control}
            rules={{ required: true }}
            render={({field: {onChange, value, ...rest}}) => (
              <Autocomplete
                {...rest}
                loading={provinces.isLoading}
                value={value}
                options={provinceOptions}
                onChange={(event, newValue) => {
                  onChange(newValue || null)
                }}
                getOptionLabel={(option) => option.name || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText={t(provinces.isError ? 'loading-error': 'no-options')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('state')}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    error={Boolean(errors.province)}
                    helperText={errors.province && 'Selecciona una provincia'}
                  />
                  )}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='city'
            control={control}
            rules={{ required: true }}
            render={({field: {onChange, value, ...rest}}) => (
              <Autocomplete
                {...rest}
                loading={cities.isLoading}
                value={value}
                options={cityOptions}
                onChange={(event, newValue) => {
                  onChange(newValue || null)
                }}
                getOptionLabel={(option) => option.name || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText={t(cities.isError ? 'loading-error': 'no-options')}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('city')}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    error={Boolean(errors.city)}
                    helperText={errors.city && 'Selecciona una ciudad'}
                  />
                  )}
              />
            )}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export type AddressFormData = {
  address: string
  country: CountryData | null
  province: State | null
  city: City | null
  postalCode: string
}
