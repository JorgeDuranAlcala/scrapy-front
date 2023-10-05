import { memo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'

import Icon from 'src/@core/components/icon'

import { useFormContext } from 'react-hook-form'
import { InferType } from 'yup'
import { useQuery } from '@tanstack/react-query'

import { ControlledSelect, ControlledTextField, Autocomplete } from 'src/components/Forms'

import { useAuth, useDebouncedState } from 'src/hooks'

import { STATUSES } from 'src/types'

import { SpecialFilterSchema } from 'src/schemas'
import { getMunicipalities } from 'src/services/scraping'
import { getAll } from 'src/services'

export type SpecialFiltersData = InferType<typeof SpecialFilterSchema>

export const defaultSpecialFilters = SpecialFilterSchema.getDefault()

const OPERATION = ['Venta', 'Alquiler', 'Alquiler vacacional']
const CATEGORIES = ['Pisos', 'Casas', 'Chalets', 'Terrenos', 'Locales']

type Props = {
  isScraping?: boolean
}

export const SpecialFilters = memo(({ isScraping = false }: Props) => {
  const { user } = useAuth()
  const { asPath } = useRouter()
  const [municipality, debouncedMunicipality, setMunicipality] = useDebouncedState('')
  const [userData, debouncedUserData, setUserData] = useDebouncedState('', 500)
  const { setValue, watch } = useFormContext()

  const is_vip = watch('is_vip')

  const municipalities = useQuery({
    queryKey: ['municipalities', debouncedMunicipality],
    queryFn: async () => {
      return await getMunicipalities(debouncedMunicipality)
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers
  } = useQuery({
    queryKey: ['get-users', debouncedUserData],
    queryFn: async () => {
      return await getAll(1, 5, debouncedUserData)
    },
    select: data => {
      return data.users || []
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  return (
    <Stack gap={5}>
      <Grid container spacing={3}>
        <Grid item md={4} sm={12}>
          <FormControl fullWidth>
            <Autocomplete
              name='municipality'
              label='Población'
              isOptionEqualToValue={(option, value) => option.name === value.name}
              loading={municipalities.isLoading || municipality !== debouncedMunicipality}
              options={municipalities.data || []}
              error={municipalities.isError}
              onInputChange={(str: string) => {
                setMunicipality(str)
              }}
              inputValue={municipality}
            />
          </FormControl>
        </Grid>
        <Grid item md={2} sm={12}>
          <ControlledSelect name='zone' label='Zona' options={['ejemplo1', 'ejemplo2']} />
        </Grid>
        <Grid item md={2} sm={12}>
          <ControlledSelect name='status' label='Estado' options={STATUSES} />
        </Grid>
        <Grid item md={2} sm={12}>
          <ControlledSelect name='operation' label='Operación' allowEmpty={true} options={OPERATION} />
        </Grid>
        <Grid item md={2} sm={12}>
          <ControlledSelect name='category' label='Categoría' allowEmpty={true} options={CATEGORIES} />
        </Grid>
      </Grid>
      <Divider />
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Grid container spacing={3} alignItems='center'>
          <Grid item md={3} xs={12}>
            <FormControl fullWidth>
              <ControlledTextField
                name='search'
                label='Buscar'
                size='small'
                fullWidth={true}
                sx={{
                  minWidth: '100%',
                  width: '100%'
                }}
              />
            </FormControl>
          </Grid>

          {asPath.includes('history') && (
            <Grid item md={2} sm={12}>
              <FormControl fullWidth>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.email === value.email}
                  name='userData'
                  label='Usuario'
                  options={usersData || []}
                  loading={isLoadingUsers || userData !== debouncedUserData}
                  error={isErrorUsers}
                  getOptionsLabel={option => option.fullname || ''}
                  onInputChange={str => {
                    setUserData(str)
                  }}
                  inputValue={userData}
                />
              </FormControl>
            </Grid>
          )}

          <Grid item md={2} sm={12}>
            <IconButton color='warning' onClick={() => setValue('is_vip', !is_vip)}>
              <Icon icon={`tabler:star${is_vip ? '-filled' : ''}`} />
            </IconButton>
          </Grid>
        </Grid>

        {user?.is_admin && !asPath.includes('history') && (
          <Stack direction='row' gap={5} alignItems='center'>
            <Link href={`${asPath}history`} passHref>
              <Button color='secondary' variant='outlined'>
                Historial
              </Button>
            </Link>
            <Button
              variant='contained'
              type='submit'
              disabled={municipality.length === 0 || isScraping}
              endIcon={isScraping && <CircularProgress size={16} />}
            >
              Actualizar
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
})
