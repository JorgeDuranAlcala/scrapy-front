import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'

import { useFormContext, Controller } from 'react-hook-form'
import { InferType } from 'yup'

import { ControlledSelect } from 'src/components/Forms'

import { useAuth } from 'src/hooks'

import { STATUSES } from 'src/types'

import { SpecialFilterSchema } from 'src/schemas'

type SpecialFiltersProps = {
  search: string
  setSearch: (search: string) => void
}

export type SpecialFiltersData = InferType<typeof SpecialFilterSchema>

export const defaultSpecialFilters: SpecialFiltersData = {
  city: null,
  zone: '',
  status: '',
  operation: '',
  category: ''
}

const OPERATION = ['Venta', 'Alquiler', 'Alquiler vacacional']
const CATEGORIES = ['Pisos', 'Casas', 'Chalets', 'Terrenos', 'Locales']

export const SpecialFilters = ({ search, setSearch }: SpecialFiltersProps) => {
  const { user } = useAuth()
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Stack gap={5}>
      <Grid container spacing={3}>
        <Grid item md={4} sm={12}>
          <FormControl fullWidth>
            <Controller
              name='city'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, ...rest } }) => (
                <Autocomplete
                  {...rest}
                  loading={false}
                  value={value}
                  options={[]}
                  onChange={(event, newValue) => {
                    onChange(newValue || null)
                  }}
                  getOptionLabel={option => option.name || ''}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  noOptionsText={false ? 'Error de busqueda, intente de nuevo' : 'Sin resultados'} // BACKEND NEEDED
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={'Población'}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password' // disable autocomplete and autofill
                      }}
                      error={Boolean(errors.city)}
                      helperText={errors.city && 'Selecciona una poblacion'}
                    />
                  )}
                />
              )}
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
          <ControlledSelect name='operation' label='Operación' options={OPERATION} />
        </Grid>
        <Grid item md={2} sm={12}>
          <ControlledSelect name='category' label='Categoría' options={CATEGORIES} />
        </Grid>
      </Grid>
      <Divider />
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <TextField
          value={search}
          size='small'
          placeholder='Buscar'
          sx={{ minWidth: '500px' }}
          onChange={e => {
            setSearch(e.target.value)
          }}
        />
        <Stack direction='row' gap={5} alignItems='center'>
          {user?.admin && (
            <Button color='secondary' variant='outlined'>
              Historial
            </Button>
          )}
          <Button variant='contained' type='submit'>Actualizar</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
