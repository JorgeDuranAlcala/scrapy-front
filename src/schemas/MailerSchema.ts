import yup from "src/@core/utils/customized-yup"

const MailerSchema = yup.object({
  securityProtocol: yup.string().min(1).default('TLS'),
  smtpHost: yup.string().min(1).default(''),
  smtpPort: yup.string().min(1).default(''),
  email: yup.string().min(1).default(''),
  password: yup.string().min(1).default(''),
})

export default MailerSchema
