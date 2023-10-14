import yup from 'src/@core/utils/customized-yup'
import { InferType } from 'yup'

const ForgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('El campo email no puede estar vacío')
    .email('El formato del email no es válido')
    .default('')
})

export type ForgotPasswordData = InferType<typeof ForgotPasswordSchema>

export default ForgotPasswordSchema
