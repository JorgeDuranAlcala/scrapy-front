import yup from "src/@core/utils/customized-yup"

export const updateCredentialsSchema = yup.object().shape({
  email: yup.string().email().min(1),
  currentPassword: yup.string().when(['email', 'newPassword'],{
    is: (email: string, currentPassword: string) => email || currentPassword,
    then: (schema) => schema.min(8, "form-error.password-incorrect")
  }),
  newPassword: yup.string().ensure().test(
    "match-or-undefined",
    "form-error.password-regex",
    (newPassword) => Boolean(newPassword.match(/.+/))
  ),
  confirmPassword: yup.string().when('newPassword', (newPassword, schema) =>{
    return newPassword ? schema.test(
      'confirm-password',
      'form-error.confirm-password',
      (confirmPassword: string) => newPassword === confirmPassword
    ) : schema
  })
})
