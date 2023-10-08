import { EmailSchema, TemplateData } from 'src/schemas'
import { restRequestAuth } from '../rest-requests'
import { InferType } from 'yup'

export type Email = InferType<typeof EmailSchema>

const updateEmailTemplate = async (data: TemplateData) => {
  const response = await restRequestAuth('PUT', `/template/update`, { params: data })

  return response
}

export default updateEmailTemplate
