import yup from 'src/@core/utils/customized-yup'
import GenericSchema1 from './GenericSchema1'
import GenericSchema2 from './GenericSchema2'

const OtherAddrSchema = yup.object().shape({
  billingAlert: yup.string()
})
  .concat(GenericSchema1)
  .concat(GenericSchema2)
  .omit(['tags'])

export default OtherAddrSchema
