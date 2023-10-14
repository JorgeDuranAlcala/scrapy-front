import yup from 'src/@core/utils/customized-yup'
import { InferType } from 'yup'

const RepeatPasswordSchema = yup.object({
  password: yup
    .string()
    .required('El campo contraseña no puede estar vacío.')
    .min(8, 'La contraseña debe tener un minimo de 8 caracteres.')
    .matches(/[a-zA-Z]/, 'La contraseña debe tener al menos una letra.')
    .default(''),
  repeatPassword: yup
    .string()
    .required('El campo repetir contraseña no puede estar vacío')
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir.')
    .default('')
})

export type RepeatPasswordData = InferType<typeof RepeatPasswordSchema>

export default RepeatPasswordSchema
