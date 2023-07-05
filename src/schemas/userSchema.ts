import yup from 'src/@core/utils/customized-yup'

const userSchema = yup.object().shape({
  role: yup.string().oneOf(['manager', 'superAdmin']),
  nameAndLastname: yup.string().min(1),
  DNI: yup.string(),
  phone: yup.string().phoneOrEmpty(),
  email: yup.string().email("form-error.invalid-email").min(1),
  password: yup.string().min(8, "min-password-length"),
  comments: yup.string()
})

export default userSchema
