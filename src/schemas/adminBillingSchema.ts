import yup from 'src/@core/utils/customized-yup'
import AddressSchema from './AddressSchema'

const adminBillingSchema = yup.object().shape({
  fiscalName: yup.string().min(1),
  NIF: yup.string().min(1),
  phone: yup.string().phoneOrEmpty().min(1),
  email: yup.string().email("form-error.invalid-email").min(1)
}).concat(AddressSchema)


export default adminBillingSchema
