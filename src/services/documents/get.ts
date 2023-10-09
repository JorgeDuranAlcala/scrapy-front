import { restRequestAuth } from "src/services/rest-requests";

type data = {
  postId: number
}

export const getDocuments = async ({postId} : data) => {
  const response = await restRequestAuth('GET', `/attachments/${postId}`)

  const formatData = response.data.map(({name, id, webViewLink, webContentLink, createdTime}: any) => ({
    id,
    name,
    viewLink: webViewLink,
    downloadLink: webContentLink,
    createdAt: createdTime
  }))

  return formatData
}

