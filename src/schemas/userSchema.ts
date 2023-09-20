import yup from 'src/@core/utils/customized-yup'

const userSchema = yup.object({
  id: yup.number().optional(),
  fullname: yup.string().default('').min(1).required(),
  dni: yup.string().default('').optional(),
  job: yup.string().default('').optional(),
  salary: yup.number().positive().optional()
    .transform((value, original) => {
      console.log(value, original)
      return original === '' || !original ? undefined : value
    }),
  payment_method: yup.string().default(''),
  phone: yup.string().default('').phoneOrEmpty(),
  email: yup.string().default('').email("form-error.invalid-email").min(1).required(),
  password: yup.string().when('id', {
    is: (id: number) => typeof id === 'number',
    then: (schema) => schema.min(8,'La contraseña debe tener un minimo de 8 caracteres')
  }),
  comments: yup.string().default('')
})

export default userSchema
