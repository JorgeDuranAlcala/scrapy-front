import yup from 'src/@core/utils/customized-yup'

const pluginSchema = yup.object().shape({
  name: yup.string().required('form-error.empty'),
  ledgerAccount: yup.string().required('form-error.empty-select'),
  description: yup.string()
})

export default pluginSchema
