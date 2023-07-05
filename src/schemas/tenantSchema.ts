import yup from 'src/@core/utils/customized-yup'
import GenericSchema1 from './GenericSchema1'

const tenantSchema = yup
  .object()
  .shape({
    fiscalName: yup.string().required(),
    NIF: yup
      .string()
      .matches(/^[A-Z0-9]{9}$/)
      .required(),
    companyActivity: yup.string().ensure().required(),
    CNAE: yup.string().ensure().required(),
    contactPerson: yup.string().required(),
    phone: yup.string().phoneOrEmpty().required(),
    email: yup.string().emailOrEmpty().required(),
    observation: yup.string(),
    tags: yup.string().ensure()
  })
  .concat(GenericSchema1)

export default tenantSchema
