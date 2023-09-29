import { restRequestAuth } from "src/services/rest-requests";

type data = {
  post_id: string | number,
  calls: number,
}

const updateCalls = async ({post_id, calls}: data) => {
  const response = await restRequestAuth('PUT', '/posts/calls', {
    body: { post_id, amount: calls}
  })

  return response
}

export default updateCalls
