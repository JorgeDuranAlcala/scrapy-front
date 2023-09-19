import { restRequest } from "./restRequest";
import { get, remove } from 'src/services/storage'
import { authConfig } from "src/configs";

const { jwtRefresh, jwt, storedUser } = authConfig

const refreshToken = async () => {
  const refreshT = get(jwtRefresh)
  try {
    if(!refreshT) throw { jwtRefreshErr: 'No refresh token!'}
    const response = await restRequest('POST', '/users/refresh', {
      headers: { Authorization: `Bearer ${refreshT}` }
    })
    if(!response.jwt) throw { jwtRefreshErr: "Refresh token server error!"}

    return response.jwt
  }
  catch(e: any) {
    if(e.jwtRefreshErr){
      console.log(e.jwtRefreshErr)
      remove(jwtRefresh)
      remove(jwt)
      remove(storedUser)
      window.location.reload()
    }
  }
}

export default refreshToken
