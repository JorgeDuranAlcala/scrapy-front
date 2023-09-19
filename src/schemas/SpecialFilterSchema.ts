import yup from 'src/@core/utils/customized-yup'

const location = yup.object().shape({
  id: yup.number(),
  name: yup.string()
}).nullable().default(null)
}).nullable().default(null)

const specialFilterSchema = yup.object({
  city: location,
  zone: yup.string().default(''),
  status: yup.string().default(''),
  operation: yup.string().default(''),
  category: yup.string().default(''),
  search: yup.string().default(''),
  vip: yup.boolean().default(false)
})

export default specialFilterSchema
