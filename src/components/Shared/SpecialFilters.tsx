import { memo, useEffect } from 'react'
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
import { getMunicipalities, getZones } from 'src/services/scraping'
import { getAll } from 'src/services'
import { styled } from '@mui/system'

export type SpecialFiltersData = InferType<typeof SpecialFilterSchema>

export const defaultSpecialFilters = SpecialFilterSchema.getDefault()

const OPERATION = ['Venta', 'Alquiler', 'Alquiler vacacional']
const CATEGORIES = ['Piso', 'Casa', 'Chalets', 'Terrenos', 'Local']

type Props = {
  isScraping?: boolean
}

interface StyleProps {
  isHistory?: boolean
}

const FilterContainer = styled('div')(({}) => ({
  '@media (min-width: 0px)': {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '13px',
    flexWrap: 'wrap'
  },
  '@media (min-width: 900px)': {
    width: 'inherit'
  }
}))

const SearchContainer = styled('div')<StyleProps>(({ isHistory }) => {
  return {
    '@media (min-width: 0px)': {
      width: isHistory ? '250px' : '100%',
      flexGrow: isHistory ? '0' : '1',
      display: 'flex'
    },
    '@media (min-width: 900px)': {
      width: 'inherit'
    }
  }
})

export const SpecialFilters = memo(({ isScraping = false }: Props) => {
  const { user } = useAuth()
  const { asPath } = useRouter()
  const [municipalitySearch, debouncedMunicipality, setMunicipality] = useDebouncedState('')
  const [userData, debouncedUserData, setUserData] = useDebouncedState('', 500)
  const { setValue, watch } = useFormContext()

  const [is_vip, municipality] = watch(['is_vip', 'municipality'])

  const municipalities = useQuery({
    queryKey: ['municipalities', debouncedMunicipality],
    queryFn: async () => {
      return await getMunicipalities(debouncedMunicipality)
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const zones = useQuery({
    queryKey: ['zones', municipality],
    queryFn: async () => await getZones(municipality.name),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  useEffect(() => {
    if (municipality?.name) {
      zones.refetch({
        queryKey: ['zones', municipality]
      })
    }
  }, [municipality])

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
        <Grid item md={4} xs={6}>
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
              inputValue={municipalitySearch}
            />
          </FormControl>
        </Grid>
        <Grid item md={2} xs={6}>
          <FormControl fullWidth>
            <Autocomplete
              name='zone'
              label='Zona'
              isOptionEqualToValue={(option, value) => option.name === value.name}
              loading={zones.isLoading}
              options={zones.data || []}
              error={zones.isError}
              onInputChange={(str: string) => {
                setMunicipality(str)
              }}
            />
          </FormControl>
        </Grid>
        <Grid item md={2} xs={6}>
          <ControlledSelect name='status' label='Estado' options={STATUSES} />
        </Grid>
        <Grid item md={2} xs={6}>
          <ControlledSelect name='operation' label='Operación' allowEmpty={true} options={OPERATION} />
        </Grid>
        <Grid item md={2} xs={6}>
          <ControlledSelect name='category' label='Categoría' allowEmpty={true} options={CATEGORIES} />
        </Grid>
      </Grid>
      <Divider />

      <Stack direction='row' alignItems='center' justifyContent='space-between' flexWrap={'wrap'} gap={3}>
        <FilterContainer>
          <SearchContainer isHistory={asPath.includes('history')}>
            <FormControl fullWidth>
              <ControlledTextField
                name='search'
                label='Buscar'
                size='small'
                fullWidth={true}
                sx={{
                  minWidth: '250px',
                  width: '100%'
                }}
              />
            </FormControl>
          </SearchContainer>

          {asPath.includes('history') && (
            <Stack>
              <FormControl
                fullWidth
                sx={{
                  minWidth: '200px',
                  width: '100%'
                }}
              >
                <Autocomplete
                  size='small'
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
            </Stack>
          )}

          <Stack>
            <IconButton color='warning' onClick={() => setValue('is_vip', !is_vip)}>
              <Icon icon={`tabler:star${is_vip ? '-filled' : ''}`} />
            </IconButton>
          </Stack>
        </FilterContainer>

        <Stack>
          {!asPath.includes('history') && (
            <Stack direction='row' gap={5} alignItems='center'>
              {user?.is_admin && (
                <Link href={`${asPath}history`} passHref>
                  <Button color='secondary' variant='outlined'>
                    Historial
                  </Button>
                </Link>
              )}
              <Link href={`${asPath}spam`} passHref>
                <Button variant='contained'>Spam</Button>
              </Link>
              <Button
                variant='contained'
                type='submit'
                disabled={municipalitySearch.length === 0 || isScraping}
                endIcon={isScraping && <CircularProgress size={16} />}
              >
                Actualizar
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
})
