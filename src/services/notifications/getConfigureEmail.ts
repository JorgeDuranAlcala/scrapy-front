import { MailerSchema } from 'src/schemas'
import { restRequestAuth } from '../rest-requests'

type ResponseGetConfigureEmail = {
  MAIL_ADDRESS?: string
  MAIL_PORT?: string
  MAIL_PROTOCOL?: string
  MAIL_SERVER?: string
  MAIL_USERNAME?: string
}

type ResponseGetConfigureEmailData = {
  data?: ResponseGetConfigureEmail
}

const transformResponse = (data?: ResponseGetConfigureEmail) => {
  if (!data) {
    return MailerSchema.getDefault()
  }

  return {
    email: data?.MAIL_ADDRESS || '',
    smtpHost: data?.MAIL_SERVER || '',
    smtpPort: data?.MAIL_PORT || '',
    securityProtocol: data?.MAIL_PROTOCOL?.toUpperCase() || ''
  }
}

const getConfigureEmail = async () => {
  const response: ResponseGetConfigureEmailData = await restRequestAuth('GET', '/notify/settings')

  return transformResponse(response.data)
}

export default getConfigureEmail
