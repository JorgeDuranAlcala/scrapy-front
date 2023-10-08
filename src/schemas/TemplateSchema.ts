import yup from 'src/@core/utils/customized-yup'
import { InferType } from 'yup'

const TemplateSchema = yup.object({
  name: yup.string().min(1).default(''),
  subject: yup.string().min(1).default(''),
  message: yup.string().min(1).default('')
})

export type TemplateData = InferType<typeof TemplateSchema>

export default TemplateSchema
