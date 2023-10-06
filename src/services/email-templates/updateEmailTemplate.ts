import { EmailSchema } from 'src/schemas'
import { restRequestAuth } from '../rest-requests'
import { InferType } from 'yup'

export type Email = InferType<typeof EmailSchema>

const updateEmailTemplate = async (email: Email, templateName: string) => {
  const response = await restRequestAuth('PUT', `/templates/${templateName}`, { body: email })

  return response
}

export default updateEmailTemplate
