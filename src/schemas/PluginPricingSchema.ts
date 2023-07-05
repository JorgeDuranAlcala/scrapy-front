import yup from "src/@core/utils/customized-yup"

const PluginPricingSchema = yup.object().shape({
  price: yup.number().typeError('form-error.NaN').min(0.99, 'form-error.min'),
  VAT: yup.number().typeError('form-error.NaN').min(0.99, 'form-error.min')
})

export default PluginPricingSchema
