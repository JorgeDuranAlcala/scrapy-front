import yup from 'src/@core/utils/customized-yup'
import { InferType } from 'yup'

const EmailSchema = yup.object({
  reciever: yup.array().of(yup.string()).min(1),
  subject: yup.string().min(1),
  message: yup.string()
})

export type EmailData = InferType<typeof EmailSchema>

export default EmailSchema
