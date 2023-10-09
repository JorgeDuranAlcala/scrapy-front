import { restRequestAuth } from "src/services/rest-requests";

type data = {
  // postId: number
  documentIds: string[]
}

export const deleteDocuments = async ({documentIds} : data) => {
  const response = await restRequestAuth('DELETE', `/attachments/${documentIds[0]}`)

  return response.data
}

