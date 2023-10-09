import { restRequestAuth } from "src/services/rest-requests";

type data = {
  postId: number
  attachments: any[]
}

export const createDocuments = async ({postId, attachments} : data) => {
  const response = await restRequestAuth('POST', `/attachments/${postId}`, {
    headers: { 'Content-Type': 'multipart/form-data', accept: 'multipart/form-data' },
    body: {attachment: attachments}
  })

  return response.data
}

