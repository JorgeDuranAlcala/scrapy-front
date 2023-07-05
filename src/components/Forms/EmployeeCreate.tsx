
// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import FormControl from '@mui/material/FormControl'
import Select from "@mui/material/Select"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from "@mui/material/MenuItem"
import FormHelperText from '@mui/material/FormHelperText'


// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
// import { useAuth } from 'src/hooks'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  role: yup.number().required()
})


const defaultValues = {
  firstName: '',
  email: '',
  lastName: '',
  role: ''
}

interface FormData {
  email: string
  firstName: string
  lastName: string
  role: number | string
}

export const EmployeeCreate = () => {

  // ** Hooks
  // const auth = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  

  const onSubmit = (data: FormData) => {

    const { email, firstName, lastName, role } = data
    console.log(email, firstName, lastName, role)

    // * to do implement submit functionality *
    // })
  }

  const emailErr = errors.email && errors.email.message

  return (
    <Box sx={{ backgroundColor: 'background.paper' }}>
          <Box sx={{ width: '100%', minWidth: 370, padding: 5 }}>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 5 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='Employee email'
                      helperText={emailErr && emailErr[0].toUpperCase() + emailErr.substring(1)}
                    />
                  )}
                />
              </FormControl>
              <Grid container spacing={2} sx={{ mb: 5 }}>
                <Grid item sm={12} xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 1.5 }}>
                    <Controller
                      name='firstName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          value={value }
                          onBlur={onBlur}
                          onChange={onChange}
                          label='First Name'
                          error={Boolean(errors.firstName)}
                          helperText={errors.firstName && "First name can't be empty"}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12} xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 1.5 }}>
                    <Controller
                      name='lastName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          label='Last Name'
                          error={Boolean(errors.lastName)}
                          helperText={ errors.lastName && "Last name field can't be empty" }
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Container sx={{ display: "flex", justifyContent:"center"}}>
                <FormControl error={errors.role !== undefined}>
                  <InputLabel id="role-label" sx={{color: errors.role && "error.main"}}>Role</InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: {value, onChange, onBlur }}) =>(
                        <Select
                          id="role"
                          value={value}
                          labelId="role-label"
                          label="Role"
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(errors.role)}
                        >
                          <MenuItem value={1}>Admin</MenuItem>
                          <MenuItem value={2}>Office</MenuItem>
                          <MenuItem value={3}>Sales</MenuItem>
                        </Select>
                    )}
                  />
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.role && 'Employee needs to be assigned a role'}</FormHelperText>
                </FormControl>
              </Container>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mt:6 }}>
                Create account
              </Button>
            </form>
          </Box>
    </Box>
  )
}

