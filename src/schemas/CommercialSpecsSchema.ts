import yup from 'src/@core/utils/customized-yup'
import { BankSchema } from './BankSchema'

const CommercialSpecsSchema = yup.object().shape({
  paymentMethod: yup.string().min(1),
  expiryDate: yup.number().min(0).integer(),
  bankName: yup.string().min(1),
  appliedDiscount: yup.string().min(1),
  specialDiscount: yup.number().max(100, 'form-error.range').min(0, 'form-error.range'),
  commercialAgent: yup.string()
}).concat(BankSchema)

export default CommercialSpecsSchema
