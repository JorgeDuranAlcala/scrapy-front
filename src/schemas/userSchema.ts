import yup from 'src/@core/utils/customized-yup'

const userSchema = yup.object({
  nameAndLastname: yup.string().min(1).required(),
  DNI: yup.string().optional(),
  job: yup.string().optional(),
  salary: yup.number().positive().optional(),
  paymentMethod: yup.string(),
  phone: yup.string().phoneOrEmpty(),
  email: yup.string().email("form-error.invalid-email").min(1).required(),
  password: yup.string().min(8,'La contraseña debe tener un minimo de 8 caracteres').required(),
  comments: yup.string()
})

export default userSchema
