import yup from 'src/@core/utils/customized-yup'
import AddressSchema from './AddressSchema'

const EmployeeSchema = yup.object().shape({
  fullName: yup.string().min(1),
  dni: yup.string().min(1),
  jobPosition: yup.string().min(1),
  phone: yup.string().phoneOrEmpty(),
  email: yup.string().email(),
  language: yup.string().min(1),
  timezone: yup.string().min(1),
  currency: yup.string().min(1)
}).concat(AddressSchema)

export default EmployeeSchema

