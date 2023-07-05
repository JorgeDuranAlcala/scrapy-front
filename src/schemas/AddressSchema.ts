import yup from 'src/@core/utils/customized-yup'

const location = yup.object().shape({
  id: yup.number(),
  name: yup.string().min(1)
})

const AddressSchema = yup.object().shape({
  address: yup.string().min(1),
  country: yup.object().shape({
    id: yup.number(),
    nameNative: yup.string()
  }),
  province: location,
  city: location,
  postalCode: yup.string().min(1),
})

export default AddressSchema
