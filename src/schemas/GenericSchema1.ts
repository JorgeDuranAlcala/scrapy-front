import yup from 'src/@core/utils/customized-yup'
import AddressSchema from "./AddressSchema"

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

const GenericSchema1 = yup.object().shape({
  contactPerson: yup.string().ensure(),
  phone: yup
    .string()
    .ensure()
    .test(
      'is-valid-number',
      'invalid-phone-number',
      phoneNum => phoneNum === '' || Boolean(phoneNum.match(phoneRegex))
    ),
  email: yup.string().email(),
}).concat(AddressSchema)

export default GenericSchema1
