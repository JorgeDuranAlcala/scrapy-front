import {
  GenericForm1,
  defaultGenericForm1,
  type GenericFormData1,
  GenericForm2,
  defaultGenericForm2,
  type GenericFormData2
} from 'src/components/Forms/GenericForm'
import { GenericSchema2, GenericSchema1, AccountTypeSchema } from 'src/schemas'

// import Box from "@mui/material/Box"
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import * as yup from 'yup'
import { useFormContext, Controller, Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** Components
import { defaultAccountType, type AccountType } from './AccountType'
import { AddressForm } from 'src/components/Forms'

export const clientSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    DNI: yup.string().required(),
    civStat: yup.string(),
    profession: yup.string(),
    nationality: yup.string(),
    represents: yup.string().required().ensure()
  })
  .concat(GenericSchema1)
  .concat(GenericSchema2)
  .concat(AccountTypeSchema)

export const defaultParticularForm: ParticularFormData = {
  firstName: '',
  lastName: '',
  DNI: '',
  civStat: '',
  profession: '',
  nationality: '',
  represents: '',
  ...defaultGenericForm1,
  ...defaultGenericForm2,
  ...defaultAccountType,
  clientType: 'particular-client',
}

const civStat = ['single', 'married', 'divorced', 'widow']

export const ParticularForm = () => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Grid container spacing={5}>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='firstName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label={t('firstName')}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName && 'El campo de nombre fiscal no puede estar vacío'}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='lastName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label={t('lastName')}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName && 'El campo de nombre comercial no puede estar vacío'}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='DNI'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label='DNI'
                error={Boolean(errors.DNI)}
                helperText={errors.DNI && 'El campo de DNI no puede estar vacío'}
              />
            )}
          />
        </FormControl>
      </Grid>

      <AddressForm/>

      <Grid item sm={12} md={4}>
        <FormControl error={errors.civStat !== undefined} fullWidth>
          <InputLabel id='civStat-label' sx={{ color: errors.civStat && 'error.main' }}>
            {t('civStatus')}
          </InputLabel>
          <Controller
            name='civStat'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                id='civStat'
                value={value}
                labelId='civStat-label'
                label={t('civStatus')}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.civStat)}
              >
                {civStat.map(stat => (
                  <MenuItem key={stat} value={stat}>
                    {t(stat)}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='profession'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label={t('profession')}
                error={Boolean(errors.profession)}
                helperText={errors.profession && 'El campo de profesion no puede estar vacío'}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item sm={12} md={4}>
        <FormControl fullWidth>
          <Controller
            name='nationality'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label={t('bornIn')}
                error={Boolean(errors.nationality)}
                helperText={errors.nationality && 'El campo no puede estar vacío'}
              />
            )}
          />
        </FormControl>
      </Grid>

      <GenericForm1 errors={errors} control={control as any as Control<GenericFormData1, any>} />

      <GenericForm2 errors={errors} control={control as any as Control<GenericFormData2, any>} />
    </Grid>
  )
}

export type ParticularFormData = {
  firstName: string
  lastName: string
  DNI: string
  civStat: 'single' | 'married' | 'divorced' | 'widow' | ''
  profession: string
  represents: string
  nationality: string
} & GenericFormData1 &
  GenericFormData2 &
  AccountType
