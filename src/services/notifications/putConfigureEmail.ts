import { MailerData } from 'src/components'
import { restRequestAuth } from '../rest-requests'

const putConfigureEmail = async ({ email, password, securityProtocol, smtpHost, smtpPort }: MailerData) => {
  const response: Promise<{ status: number }> = await restRequestAuth('PUT', '/notify/configure', {
    body: {
      mail_address: email,
      mail_password: password,
      mail_server: smtpHost,
      mail_port: smtpPort,
      mail_protocol: securityProtocol.toLowerCase()
    }
  })

  return response
}

export default putConfigureEmail
