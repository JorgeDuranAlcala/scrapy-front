import { memo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import FormControl from '@mui/material/FormControl'

import { useFormContext } from 'react-hook-form'
import { InferType } from 'yup'
import { useQuery } from '@tanstack/react-query'

import { ControlledSelect, ControlledTextField, Autocomplete } from 'src/components/Forms'

import { useAuth } from 'src/hooks'

import { STATUSES } from 'src/types'

import { SpecialFilterSchema } from 'src/schemas'

import { getProvinces, getMunicipalities } from 'src/services/data-filters'

export type SpecialFiltersData = InferType<typeof SpecialFilterSchema>

const OPERATION = ['Venta', 'Alquiler', 'Alquiler vacacional']
const CATEGORIES = ['Pisos', 'Casas', 'Chalets', 'Terrenos', 'Locales']

export const SpecialFilters = memo(() => {
  const { user } = useAuth()
  const { asPath } = useRouter()
  const {
    watch, resetField
  } = useFormContext()

  const province = watch('province')

  const provinces = useQuery({
    queryKey: ['provinces'],
    queryFn: getProvinces,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const municipalities = useQuery({
    queryKey: ['municipalities', province],
    queryFn: async () => {
      if(!province) return []
      const municipalities = await getMunicipalities(province.id)
      return municipalities.filter(({province_id}) => province_id === province.id )
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  useEffect(() => {
    if(!province) resetField('municipality')
  }, [province])

  return (
    <Stack gap={5}>
      <Grid container spacing={3}>
      <Grid item md={4} sm={12}>
          <FormControl fullWidth>
            <Autocomplete name="province" label="Provincia" isOptionEqualToValue={(option, value) => option.id === value.id}
              loading={provinces.isLoading} options={provinces.data || []} error={provinces.isError}
            />
          </FormControl>
        </Grid>
        <Grid item md={4} sm={12}>
          <FormControl fullWidth>
            <Autocomplete name="municipality" label="Población" isOptionEqualToValue={(option, value) => option.name === value.name}
              loading={municipalities.isLoading} options={municipalities.data || []} error={municipalities.isError}
            />
          </FormControl>
        </Grid>
        <Grid item md={4} sm={12}>
          <ControlledSelect name='zone' label='Zona' options={['ejemplo1', 'ejemplo2']} />
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        <Grid item md={2} sm={12}>
          <ControlledSelect name='status' label='Estado' options={STATUSES} />
        </Grid>
        <Grid item md={2} sm={12}>
          <ControlledSelect name='operation' label='Operación' options={OPERATION} />
        </Grid>
        <Grid item md={2} sm={12}>
          <ControlledSelect name='category' label='Categoría' options={CATEGORIES} />
        </Grid>
      </Grid>
      <Divider />
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <ControlledTextField name='search' label='Buscar' size='small' sx={{ maxWidth: '500px' }} />
        <Stack direction='row' gap={5} alignItems='center'>
          {user?.is_admin && !asPath.includes('history') && (
            <Link href={`${asPath}history`} passHref>
              <Button color='secondary' variant='outlined'>
                Historial
              </Button>
            </Link>
          )}
          <Button variant='contained' type='submit'>
            Actualizar
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
})
