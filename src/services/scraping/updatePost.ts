import { restRequestAuth } from 'src/services/rest-requests'
import { type GridValidRowModel } from '@mui/x-data-grid'

const getPosts = async (data: GridValidRowModel) => {
  const {
    id,
    state_id,
    email,
    published_in,
    title,
    operation_id,
    category_id,
    price,
    meters,
    price_per_meter,
    phone,
    vip
  } = data
  const response = await restRequestAuth('PUT', '/posts/data', {
    body: {
      post_id: id,
      state_id,
      email,
      published_in,
      title,
      operation_id,
      category_id,
      price,
      meters,
      price_per_meter,
      phone,
      is_vip: vip
    }
  })

  return response
}

export default getPosts
