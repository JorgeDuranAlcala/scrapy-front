import yup from 'src/@core/utils/customized-yup'

const EmailSchema = yup.object().shape({
  to: yup.array().of(yup.string()).min(1),
  subject: yup.string().min(1),
  message: yup.string()
})

export default EmailSchema
