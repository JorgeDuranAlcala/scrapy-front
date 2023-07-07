import yup from 'src/@core/utils/customized-yup'

const location = yup.object().shape({
  id: yup.number(),
  name: yup.string()
}).nullable()

const specialFilterSchema = yup.object({
  city: location,
  zone: yup.string(),
  status: yup.string(),
  operation: yup.string(),
  category: yup.string(),
  search: yup.string()
})

export default specialFilterSchema
