import { EmailData } from 'src/schemas'
import { restRequestAuth } from '../rest-requests'

const sendEmail = async (data: EmailData) => {
  const response = await restRequestAuth('POST', '/notify', {
    body: data,
    headers: { 'Content-Type': 'multipart/form-data', accept: 'multipart/form-data' }
  })
  return response.data
}

export default sendEmail
